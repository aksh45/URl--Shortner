$(document).ready(function() {

    // process the form
    $('#form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        const passw = $('input[name=password]').val();
        const passw2 = $('input[name=passwordverify]').val();
        const len = passw.length;
        if(len<6){
             $('#error_msg').html('"password" length must be at least 6 characters long');
             return false;
        }
        else if (passw != passw2){
             $('#error_msg').html('password in both fields must be same');
             return false;
        }
        var formData = {
            'password' : $('input[name=password]').val(),
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/auth/setpass', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
		 if(data=="0"){
			$('#error_msg').html('Something Went Wrong');
			$('[name="email"]').val('');
            $('[name="userid"]').val('');
		 }
		 else if(data=="1"){
            $('#error_msg').css({color:'#008000'});
			$('[name="email"]').val('');
            $('[name="userid"]').val('');
            window.location.href = "/auth/login";
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
