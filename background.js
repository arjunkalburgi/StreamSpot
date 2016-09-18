var kanyePlaylist='5poflllJE2p9koyxXWd1Xr';

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
                    content: encodeXml(data.tracks.items[i].id),
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

	console.log('id for song is ', text);

	// set up interfacing 
    var Spotify = require(['spotify-web-api']);
    var s = new Spotify();
    var spotifyApi = new SpotifyWebApi();
    chrome.storage.sync.get("AccessToken", (StorageObj) => {
        spotifyApi.setAccessToken(StorageObj.AccessToken);
    });

    // tracks data
    prev = spotifyApi.searchTracks(text, {
            limit: 5
        })
        .then(function(data) {
            console.log("Spotify searchTracks");
            console.log(data);
            // clean the promise so it doesn't call abort
            prev = null;

            // ...render list of search results...

        }, function(err) {
            console.error(err);
        });

    console.log('HERE');

    var str2='spotify:track:'.concat(text);
    var Spotify = require(['spotify-web-api']);
    var s = new Spotify();

    var spotifyApi = new SpotifyWebApi();
    chrome.storage.sync.get("AccessToken", (StorageObj) => {
        spotifyApi.setAccessToken(StorageObj.AccessToken);

        console.log(StorageObj.AccessToken);
    });
    spotifyApi.addTracksToPlaylist('askalburgionspotify',kanyePlaylist, str2)
  .then(function(data) {
    console.log('User ', data);
  }, function(err) {
    console.error(err);
  });

  	var audiotag = new Audio();
  	var _playing = false;
		var _track = '';
		var _volume = 100;
		var _progress = 0;
		var _duration = 0;
		var _trackdata = null;

		function tick() {
			if (!_playing) {
				return;
			}
			_progress = audiotag.currentTime * 1000.0;

			$rootScope.$emit('trackprogress');
			
		}

		var ticktimer = 0;

		function enableTick() {
			disableTick();
			ticktimer = $interval(tick, 100);
		}

		function disableTick() {
			if (ticktimer != 0) {
				$interval.cancel(ticktimer);
			}
		}

	function createAndPlayAudio(url, callback, endcallback) {
			console.log('createAndPlayAudio', url);
			if (audiotag.src != null) {
				audiotag.pause();
				audiotag.src = null;
			}
			audiotag.src = url;
			audiotag.addEventListener('loadedmetadata', function() {
				console.log('audiotag loadedmetadata');
				_duration = audiotag.duration * 1000.0;
				audiotag.volume = _volume / 100.0;
				audiotag.play();
				callback();
			}, false);
			audiotag.addEventListener('ended', function() {
				console.log('audiotag ended');
				_playing = false;
				_track = '';
				disableTick();
				$rootScope.$emit('endtrack');
			}, false);
		}
		

				
			

  	spotifyApi.getTrack(text).then(function(trackdata) {
					console.log('playback got track', trackdata);
					createAndPlayAudio(trackdata.preview_url, function() {
						 _trackdata = trackdata;
						 _progress = 0;
						 $rootScope.$emit('playerchanged');
						 $rootScope.$emit('trackprogress');
						 enableTick();
					});
				});


    /*spotifyApi.getUserPlaylists('askalburgionspotify')
  .then(function(playlistData) {
    console.log('User playlists', playlistData);
  }, function(err) {
    console.error(err);
  });
  console.log('playlist id: ',playlistData.items[0].id);
*/

  // spotifyApi.createPlaylist('askalburgionspotify',{'name':'StreamSpot','public':'true'})
  // .then(function(data) {
  //   console.log('User playlists', data);
  // }, function(err) {
  //   console.error(err);
  // });

  // spotifyApi.getUserPlaylists('askalburgionspotify')
  // .then(function(data) {
  //   console.log('User playlists', data);
  // }, function(err) {
  //   console.error(err);
  // });

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