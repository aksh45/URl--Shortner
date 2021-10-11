$(document).ready(function() {

    // process the form
    $('#form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'name'             : $('input[name=name]').val(),
            'url'              : $('input[name=url]').val(),
	        'button'           : $('input[name=button]').val(),
            'password'         : $('input[name=password]').val(),
            'make_public'      : $('#make_public').prop('checked') == true ? true: false,
        };
        console.log($('input[name=public_link]').val())
        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
		 if(data.message == "failed"){
			$('#error_msg').html('You already have created alias by this name');
			$('[name="name"]').val('');
		 }
		 else if(data.message == "success"){
			window.location.href = "/";
		 }
		 else{
			 $('#error_msg').html('Something Went Wrong');
                        $('[name="name"]').val('');
		 }
                console.log(data);

                // here we will handle errors and validation messages
            });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
