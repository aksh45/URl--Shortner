$(document).ready(function(){

   $("#name").keyup(function(){

      var name = $(this).val().trim();
      name = username.toLowerCase();
      var username_state = 0;
      $('#button').attr('disabled', true);
      var regex = /[^\w]/gi;
      if(regex.test(username) == true) {
    		return $("#error_msg").html('Your search string contains illegal characters.');
	}
      if(username != '' && username.length>3){

         $.ajax({
		 url: '/available',
            type: 'post',
            data: {userid: username},
            success: function(response){
		username_state = response;
		if(response=="Username is not available"){
			$('#button').attr('disabled', true);
			$('#error_msg').html(response);
		}
		if(response=="Username is available"){
			$('#button').removeAttr('disabled');
			$('#error_msg').html('');
		}


             }
         });
      }else{
         $("#error_msg").html("");
      }

    });

});

