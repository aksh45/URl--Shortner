$(document).ready(function() {

    // process the form
    $('#form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        
        var formData = {
            'userid' : $('input[name=userid]').val(),
            'password' : $('input[name=password]').val(),

        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/auth/login', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
		 if(data=="0"){
			$('#error_msg').html('Wrong Credentials');
			$('[name="password"]').val('');
            $('[name="userid"]').val('');
		 }
		 else if(data=="1"){
            window.location.href = "/";
		 }
         else{
            $('#error_msg').html('Something Went Wrong');
         }
                console.log(data);

                // here we will handle errors and validation messages
            });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();

    });
});
