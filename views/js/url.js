$(document).ready(function(){

   $("#name").keyup(function(){

      var name = $(this).val().trim();
      name = name.toLowerCase();
      var username_state = 0;
      $('#button').attr('disabled', true);
      var regex = /[^\w]/gi;
      if(regex.test(name) == true) {
    		return $("#error_msg").html('Your name string contains illegal characters.');
	}
      if(name.length<3){
		return $('#button').attr('disabled', true);
      }
      if(regex.test(name) == false){
	         $('#button').removeAttr('disabled');
		return $("#error_msg").html('');
      }

});

});
