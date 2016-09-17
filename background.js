chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    console.log('Search Spotify for: ' + text);
    chrome.omnibox.setDefaultSuggestion({
        description: "Press Enter to search Spotify"
    });


    var Spotify = require(['spotify-web-api']);
    var s = new Spotify();

    var spotifyApi = new SpotifyWebApi();
    chrome.storage.sync.get("AccessToken", (StorageObj) => {
        spotifyApi.setAccessToken(StorageObj.AccessToken);
        console.log(StorageObj.AccessToken);
    });

    var prev = null;
    if (prev !== null) {
        prev.abort();
    }
    prev = spotifyApi.searchTracks(text, {
            limit: 5
        })
        .then(function(data) {

            console.log(data);

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
                    content: encodeXml(str1),
                    description: encodeXml(str1)
                });
                console.log(str1);
            }
            prev = null;
            if (suggestions != null) {
                suggest(suggestions);
            }
            // ...render list of search results...

        }, function(err) {
            console.log('im here');
            console.error(err);
        });


    /*
    // console.log('inputChanged: ' + text);
	
    // First suggest line
    var char_remain = new String();
    if (text.length<=140){
    		char_remain="Press Enter to Tweet - " + String(140-text.length) + " characters remaining";
    	}
    	else {
    		char_remain="Too Long!";
    	}
    chrome.omnibox.setDefaultSuggestion({
    	description: char_remain
    });
	
    // Other suggest lines
    */
    /*var suggestions = [];
	suggestions.push({ content: 'Coffee - Wikipedia', description: 'Coffee - Wikipedia' });
        suggestions.push({ content: 'Starbucks Coffee', description: 'Starbucks Coffee' });
	suggest(suggestions);*/
});
var _baseUri = 'https://api.spotify.com/v1';
// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function(text) {
    // set up interfacing 
    var Spotify = require(['spotify-web-api']);
    var s = new Spotify();
    var spotifyApi = new SpotifyWebApi();
    chrome.storage.sync.get("AccessToken", (StorageObj) => {
        spotifyApi.setAccessToken(StorageObj.AccessToken);
    });

    // tracks data
    // prev = spotifyApi.searchTracks(text, {
    //         limit: 5
    //     })
    //     .then(function(data) {
    //         console.log("Spotify searchTracks");
    //         console.log(data);
    //         // clean the promise so it doesn't call abort
    //         prev = null;

    //         // ...render list of search results...
    //         // clean the promise so it doesn't call abort
    //         function encodeXml(s) {
    //             var holder = document.createElement('div');
    //             holder.textContent = s;
    //             return holder.innerHTML;
    //         }
    //         var suggestions=[];
    //         for (i=0;i<data.tracks.items.length;i++){
    //             str1=data.tracks.items[i].name.concat(' by ').concat(data.tracks.items[i].artists['0'].name);
    //             suggestions.push({content:encodeXml(str1), description:encodeXml(str1)});
    //             console.log(str1);
    //         }
    //         prev = null;
    //         if(suggestions!=null){
    //             suggest(suggestions);
    //         }

    //     }, function(err) {
    //         console.error(err);
    //     });

    console.log('HERE');
});