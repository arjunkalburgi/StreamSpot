var kanyePlaylist='5poflllJE2p9koyxXWd1Xr';

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    // console.log('Search Spotify for: ' + text);
    chrome.omnibox.setDefaultSuggestion({
		description: "Press Enter on one of the below links to add it to your 'Save It For Later' Spotify Playlist"
    });

    // add spotify
    var Spotify = require(['spotify-web-api']);
    var s = new Spotify();
    var spotifyApi = new SpotifyWebApi();
    chrome.storage.sync.get("AccessToken", (StorageObj) => {
        spotifyApi.setAccessToken(StorageObj.AccessToken);
        // console.log(StorageObj.AccessToken);
    });

    var prev = null;
    if (prev !== null) {
        prev.abort();
    }
    prev = spotifyApi.searchTracks(text, {
            limit: 5
        })
        .then(function(data) {

            // console.log(data);

            // clean the promise so it doesn't call abort
            function encodeXml(s) {
                var holder = document.createElement('div');
                holder.textContent = s;
                return holder.innerHTML;
            }
            var suggestions = [];
            for (i = 0; i < data.tracks.items.length; i++) {
                str1 = data.tracks.items[i].name.concat(' by ').concat(data.tracks.items[i].artists['0'].name);
                suggestions.push({
                    content: encodeXml(data.tracks.items[i].id),
                    description: encodeXml(str1)
                });
                // console.log(str1);
            }
            prev = null;
            if (suggestions != null) {
                suggest(suggestions);
            }
            // ...render list of search results...

        }, function(err) {
            console.log('error in onInputChanged');
            console.error(err);
        });
});


chrome.omnibox.onInputEntered.addListener(function(text) {

	// set up interfacing 
    var Spotify = require(['spotify-web-api']);
    var s = new Spotify();
    var spotifyApi = new SpotifyWebApi();
    chrome.storage.sync.get("AccessToken", (StorageObj) => {
        spotifyApi.setAccessToken(StorageObj.AccessToken);
    });
    
	console.log('id for song is ', text);
    var str2='spotify:track:'.concat(text);

    spotifyApi.addTracksToPlaylist('askalburgionspotify',kanyePlaylist, str2)
		.then(function(data) {
			console.log('User ', data);
		}, function(err) {
			console.error(err);
		});
});