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
		var user = document.getElementsByClassName("user");
		var nouser = document.getElementsByClassName("nouser");
		if (StorageObj.AccessToken) {
			// page css
			console.log(1)
			for (var i = 0; i < nouser.length; i++) {
			    nouser[i].style.display = "none";
			}
			console.log(user)
			for (var i = 0; i < user.length; i++) {
				user[i].style.display = "unset";
			}
			// document.getElementById('wrapper').style.padding-top = 50px;

			// add spotify
			var Spotify = require(['spotify-web-api']);
			var s = new Spotify();
			var spotifyApi = new SpotifyWebApi();
			spotifyApi.setAccessToken(StorageObj.AccessToken);

			// populate 
			populatePlaylistTracks(spotifyApi);
		} else {
			console.log(2)
			for (var i = 0; i < user.length; i++) {
				user[i].style.display = "none";
			}
			for (var i = 0; i < nouser.length; i++) {
			    nouser[i].style.display = "unset";
			}
			// document.getElementById('wrapper').style.padding-top = 10px;
		}
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