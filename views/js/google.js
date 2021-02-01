
	function onSignIn(googleUser){
		var id_token = googleUser.getAuthResponse().id_token;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/auth/social');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function() {
  		console.log('Signed in as: ' + xhr.responseText);
		};
		xhr.send('id_token='+id_token);
	}
