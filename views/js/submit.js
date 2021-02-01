$(document).ready(function() {

    // process the form
    $('#form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'userid'              : $('input[name=userid]').val(),
            'email'             : $('input[name=email]').val(),
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/auth/forgot', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
		 if(data=="0"){
			$('#error_msg').html('wrong Userid Or Email');
			$('[name="email"]').val('');
            $('[name="userid"]').val('');
		 }
		 else if(data=="1"){
            $('#error_msg').css({color:'#008000'});
			$('#error_msg').html('An Email with password link has been send to you');
			$('[name="email"]').val('');
            $('[name="userid"]').val('');
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
