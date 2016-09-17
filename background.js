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

    console.log('HERE');


    var Spotify = require(['spotify-web-api']);
    var s = new Spotify();

    var spotifyApi = new SpotifyWebApi();
    chrome.storage.sync.get("AccessToken", (StorageObj) => {
        spotifyApi.setAccessToken(StorageObj.AccessToken);

        console.log(StorageObj.AccessToken);
    });
    
    spotifyApi.getUserPlaylists('askalburgionspotify')
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });

  spotifyApi.createPlaylist('askalburgionspotify',{'name':'StreamSpot','public':'true'})
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });

  spotifyApi.getUserPlaylists('askalburgionspotify')
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });

// spotifyApi.getMe()
//   .then(function(data) {
    
//     var requestData;
//     if (typeof userId === 'string') {
//       requestData = {
//         url: _baseUri + '/users/' + data.id + '/playlists'
//       };
//     } else {
//       requestData = {
//         url: _baseUri + '/me/playlists'
//       };
//       console.log("PLAYLOST: ",requestData);
//   }, function(err) {
//     console.error(err);
//   });
  

    // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
    /*spotifyApi.getArtistAlbums(text, function(err, data) {
  	if (err) console.error(err);
  	else console.log('Artist albums', data);
	});*/
    /*
    // If the tweet goes over 140 characters send a notification
    if (Notification.permission !== "granted") {
    	// 
    	Notification.requestPermission();
    }
    if (no_of_char>140) {
    	var notification = new Notification('Character limit exceeded', {
    		icon: 'ShoutBox128.png',
    		body: "Oops! You're tweet was too long, try again!",
    	});
    	notification.onclick = function () {
    		window.open("http://twitter.com/");
    	}
    }

    // Post using Twitter shit
    var xmlhttp=new XMLHttpRequest();
    // xmlhttp.open("GET","http://127.0.0.1:3000/post-status?message=" +  encodeURIComponent(text),true); // for when testing
    xmlhttp.open("GET","https://shoutboxextension.herokuapp.com/post-status?message=" +  encodeURIComponent(text),true); // for when deployed
    xmlhttp.send();
    */
});