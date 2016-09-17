window.onload = () => {
	var scopes = 'playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private';
	var callbackurl = encodeURIComponent(chrome.identity.getRedirectURL() + "callback.html"); 
	var URL = "https://accounts.spotify.com/en/authorize?client_id=7bd298c4b0bd46499b47b9acfbfd6671&scope=" + encodeURIComponent(scopes) + "&redirect_uri=" + callbackurl + "&response_type=token"

 	document.onclick = () => {
 		// console.log(callbackurl); 
 	    chrome.identity.launchWebAuthFlow({
 	   		url:URL, 
 	   		interactive:true
 	    }, (url) => {
 	    	// console.log(url);
 	    	chrome.storage.sync.set({'AccessToken':url.substring(url.indexOf("=")+1,url.indexOf("&"))}, () => {
 	    		console.log("AccessToken saved");

 	    		// chrome.storage.sync.get("AccessToken", (AT) => {
 	    		//	console.log(AT.AccessToken);
 	    		// });
 	    	}); 
 	    });

    }
 };