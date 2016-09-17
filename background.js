chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	
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
	suggest([
		{content: text + " ", description: "Use mentions - Type '@' followed by a twitter handle."},
		{content: text + " ", description: "Paste in links - They will automatically shorten."}
	]);
});

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function(text) {

	console.log('Search Spotify for: ' + text);

	var Spotify = require('spotify-web-api-js');
	var s = new Spotify();
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