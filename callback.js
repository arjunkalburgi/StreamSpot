var data;

function populatePlaylistTracks(spotifyApi) {
    console.log("populatePlaylistTracks");
    prev = spotifyApi.getPlaylistTracks("askalburgionspotify", "5poflllJE2p9koyxXWd1Xr", {})
        .then(function(data) {
            console.log(data);
            for (var i = 0; i < data.items.length; i++) {
				var tbody = document.getElementById("tracklisting");
                var tr = document.createElement("tr");
                tbody.appendChild(tr);

                var tdsong = document.createElement("td");
                tr.appendChild(tdsong);
                tdsong.innerHTML = data.items[i].track.name;

                var tdartist = document.createElement("td");
                tr.appendChild(tdartist);
                tdartist.innerHTML = data.items[i].track.artists[0].name;

                var tdalbum = document.createElement("td");
                tr.appendChild(tdalbum);
                tdalbum.innerHTML = data.items[i].track.album.name;
            }

        }, function(err) {
            console.log('populatePlaylistTracks function error');
            console.error(err);
        });
    // console.log("end of populatePlaylistTracks");
}

function configurepopup() {
	// configure popup.html
	console.log("popup")
	chrome.storage.sync.get("AccessToken", (StorageObj) => {

		// add spotify
		var Spotify = require(['spotify-web-api']);
		var s = new Spotify();
		var spotifyApi = new SpotifyWebApi();
		spotifyApi.setAccessToken(StorageObj.AccessToken);

		var user = document.getElementsByClassName("user");
		var nouser = document.getElementsByClassName("nouser");

    	prev = spotifyApi.getMe({})
        	.then(function(data) {
            	//works - no sign in required

				// populate 
				populatePlaylistTracks(spotifyApi);

				// hide/show
				for (var i = 0; i < user.length; i++) {
					user[i].style.display = "unset";
				}
			    nouser[0].animate([
				  // keyframes
				  { transform: 'translateY(0px)' }, 
				  { transform: 'translateY(2000px)' }
				], { 
				  // timing options
				  duration: 2000
				  // iterations: 1
				})
				setTimeout(function() {
					nouser[0].style.display = "none"; //need animated solution
				},1200);
        }, function(err) {
            console.log('not signed in');
            for (var i = 0; i < user.length; i++) {
				user[i].style.display = "none";
			}
		    nouser[0].innerHTML = "Click here to sign in";
        });		
    })
}

window.onload = () => {

	var scopes = 'playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private';
    var callbackurl = encodeURIComponent(chrome.identity.getRedirectURL() + "callback.html");
    var URL = "https://accounts.spotify.com/en/authorize?client_id=7bd298c4b0bd46499b47b9acfbfd6671&scope=" + encodeURIComponent(scopes) + "&redirect_uri=" + callbackurl + "&response_type=token"

    configurepopup()
    
	document.getElementById("signin").onclick = () => {
		var scopes = 'playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private';
	    var callbackurl = encodeURIComponent(chrome.identity.getRedirectURL() + "callback.html");
	    var URL = "https://accounts.spotify.com/en/authorize?client_id=7bd298c4b0bd46499b47b9acfbfd6671&scope=" + encodeURIComponent(scopes) + "&redirect_uri=" + callbackurl + "&response_type=token"

		console.log(callbackurl); 
		chrome.identity.launchWebAuthFlow({
			url: URL,
			interactive: true
		}, (url) => {
			// console.log(url);
			chrome.storage.sync.set({
				'AccessToken': url.substring(url.indexOf("=") + 1, url.indexOf("&"))
			}, () => {
				console.log("AccessToken saved");
	        });

			configurepopup()
	    });
	}
}