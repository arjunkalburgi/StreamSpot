window.onload = () => {

	var callbackurl = encodeURIComponent(chrome.identity.getRedirectURL() + "callback.html"); 
	var URL = "https://accounts.spotify.com/en/authorize?client_id=7bd298c4b0bd46499b47b9acfbfd6671&redirect_uri=" + callbackurl + "&response_type=token"

 	document.onclick = () => {
 		console.log(callbackurl); 
 	    chrome.identity.launchWebAuthFlow({
 	   		url:URL, 
 	   		interactive:true
 	    }, (url) => {
 	    	console.log(url);
 	    	chrome.storage.sync.set({'AccessToken':url}, () => {
 	    		console.log("AccessToken saved"); 
 	    	}); 
 	    });

    }
 };

  	   			// redirect_uri=" + https%3A%2F%2Fmcbheecpcnnheoaobnblgghppjhcilbc.chromiumapp.org%2Fcallback.html + "&\
									