$(document).ready(function(){
	$.ajax({
		type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        	url         : '/auth/verification', // the url where we want to POST
        	data        : formData, // our data object
        	dataType    : 'json', // what type of data do we expect back from the server
        	encode          : true
	});
});

