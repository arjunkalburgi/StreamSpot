var data; 

function populatePlaylistTracks(spotifyApi) {
	console.log("populatePlaylistTracks"); 
	// prev = spotifyApi.getPlaylistTracks("kanye", {
	prev = spotifyApi.getPlaylistTracks("askalburgionspotify", "5poflllJE2p9koyxXWd1Xr", {})
		.then(function(data) {
		    console.log(data);
		 	for (var i =0; i<data.items.length; i++) {
		 		var tbody = document.getElementById("tracklisting"); 
		 		var tr = document.createElement("tr");
				tbody.appendChild(tr);

		 		var tdplay = document.createElement("td"); 
		 		tr.appendChild(tdplay); 
		 		var buttonplay = document.createElement("button"); 
		 		tdplay.appendChild(buttonplay);

		 		var tdsong = document.createElement("td"); 
		 		tr.appendChild(tdsong); 
		 		tdsong.innerHTML = data.items[i].track.name;

		 		var tdartist = document.createElement("td"); 
		 		tr.appendChild(tdartist); 
		 		tdartist.innerHTML = data.items[i].track.artists[0].name;

		 		var tdalbum = document.createElement("td"); 
		 		tr.appendChild(tdalbum); 
		 		tdalbum.innerHTML = data.items[i].track.album.name;

		 		var tdtime = document.createElement("td"); 
		 		tr.appendChild(tdtime); 
		 		var ms = data.items[i].track.duration_ms;
		 		tdtime.innerHTML = Math.floor(ms/1000/60) + ":" + Math.floor((ms/1000)%60); 

		 		var tdremove = document.createElement("td"); 
		 		tr.appendChild(tdremove); 
		 		var buttonremove = document.createElement("button"); 
		 		tdremove.appendChild(buttonremove);

		 		// data.items[i].track
		 	}

		}, function(err) {
		    console.log('im here');
		    console.error(err);
		});
	console.log("end"); 
}

window.onload = () => {
	// configure popup.html
	chrome.storage.sync.get("AccessToken", (StorageObj) => {
		var user = document.getElementsByClassName("user"); 
		var nouser = document.getElementsByClassName("nouser"); 
		if (StorageObj.AccessToken) {
			// page css
			for (var i=0; i<nouser.length; i++) {
				// nouser[i].style.display = "none";
			}
			
			// add spotify
			var Spotify = require(['spotify-web-api']);
			var s = new Spotify();
			var spotifyApi = new SpotifyWebApi();
			spotifyApi.setAccessToken(StorageObj.AccessToken);

			// populate 
			populatePlaylistTracks(spotifyApi); 
		} else {
			for (var i=0; i<user.length; i++) {
				user[i].style.display = "none";
			}
		}
	})

	// begin queue 


	// oauth flow
	var callbackurl = encodeURIComponent(chrome.identity.getRedirectURL() + "callback.html"); 
	var URL = "https://accounts.spotify.com/en/authorize?client_id=7bd298c4b0bd46499b47b9acfbfd6671&redirect_uri=" + callbackurl + "&response_type=token"
 	document.getElementById("signin").onclick = () => {
 		// console.log(callbackurl); 
 	    chrome.identity.launchWebAuthFlow({
 	   		url:URL, 
 	   		interactive:true
 	    }, (url) => {
 	    	// console.log(url);
 	    	chrome.storage.sync.set({'AccessToken':url.substring(url.indexOf("=")+1,url.indexOf("&"))}, () => {
 	    		console.log("AccessToken saved"); 

 	    		chrome.storage.sync.get("queue", (StorageObj) => {
 	    			if (StorageObj.queue) {
 	    				console.log("queue exists");
 	    			} else {
 	    				console.log("make queue"); 
 	    				queue = {}; 
 	    			}
 	    		})
 	    	}); 
 	    });
    }
};
