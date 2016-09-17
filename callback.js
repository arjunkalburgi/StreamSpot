window.onload = () => {

	var callbackurl = encodeURIComponent(chrome.identity.getRedirectURL() + "callback.html"); 

 	document.onclick = () => {
 		console.log(callbackurl); 
 	    chrome.identity.launchWebAuthFlow({
 	   		url:"https://accounts.spotify.com/en/authorize?client_id=7bd298c4b0bd46499b47b9acfbfd6671&redirect_uri=https%3A%2F%2Fmcbheecpcnnheoaobnblgghppjhcilbc.chromiumapp.org%2Fcallback.html&response_type=token", 
 	   		// url:"https://accounts.spotify.com/en/authorize?client_id=7bd298c4b0bd46499b47b9acfbfd6671&redirect_uri=chrome-extension:%2F%2Fmcbheecpcnnheoaobnblgghppjhcilbc%2Fcallback.html&response_type=token", 
 	   		// url:"https://accounts.spotify.com/en/authorize?client_id=7bd298c4b0bd46499b47b9acfbfd6671&redirect_uri=http:%2F%2Fexample.com%2Fcallback&response_type=token", 
 	   		interactive:true
 	    }, (url) => console.log(url));

    }
 };