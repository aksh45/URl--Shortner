$(document).ready(function() {
   
    // process the form
    $('#form').submit(function(event) {

        const passw = $('input[name=password]').val();
        const passw2 = $('input[name=passwordverify]').val();
        const len = passw.length;
        if(len<6 ||(passw != passw2)){
            $('#error_msg').css({color:'red'});
            $('#error_msg').html('Password must be atleast 6 and password in both fields should be same');
            $('[name="password"]').val('');
            $('[name="passwordverify"]').val('');
            return false;
        }
        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'name'              : $('input[name=name]').val(),
            'userid'             : $('input[name=userid]').val(),
            'email'             : $('input[name=email]').val(),
            'password'          : $('input[name=password]').val(),
            'button'            : $('input[name=button]').val()
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/auth/register', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
		 if(data=="-1"){
            $('#error_msg').css({color:'red'});
			$('#error_msg').html('User Name is already taken ');
            
            $('[name="userid"]').val('');
           
            

		 }
		 else if(data=="1"){
            $('#error_msg').css({color:'#008000'});
			$('#error_msg').html('A Verification link has been sent at your registered email click it to activate your account');
			$('[name="name"]').val('');
            $('[name="userid"]').val('');
            $('[name="email"]').val('');
            $('[name="password"]').val('');
            $('[name="passwordverify"]').val('');
		 }
         else{
            $('#error_msg').html('Something Went Wrong');
            $('[name="name"]').val('');
            $('[name="userid"]').val('');
            $('[name="email"]').val('');
            $('[name="password"]').val('');
            $('[name="passwordverify"]').val('');

         }
                console.log(data);

                // here we will handle errors and validation messages
            });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();

    });
});
