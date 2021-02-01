$('document').ready(function(){
 var username_state = false;
 console.log("I am working");
 var email_state = false;
 $('#userid').on('blur', function(){
  var username = $('#userid').val();
  if (username == '') {
  	username_state = false;
  	return;
  }
  $.ajax({
    url: '/auth/available',
    type: 'post',
    data: {
    	'userid' : username,
    },
    success: function(response){
      if (response == '0' ) {
      	username_state = false;
      	$('#userid').parent().removeClass();
      	$('#userid').parent().addClass("form_error");
      	$('#userid').siblings("span").text('Sorry... Username already taken');
      }else if (response == '1') {
      	username_state = true;
      	$('#userid').parent().removeClass();
      }
    }
  });
 
  $('#email').on('blur', function(){
 	var email = $('#email').val();
 	if (email == '') {
 		email_state = false;
 		return;
 	}
 	$.ajax({
      url: 'register.php',
      type: 'post',
      data: {
      	'email_check' : 1,
      	'email' : email,
      },
      success: function(response){
      	if (response == '0' ) {
          email_state = false;
          $('#email').parent().removeClass();
          $('#email').parent().addClass("form_error");
          $('#email').siblings("span").text('Sorry... Email already taken');
      	}else if (response == '1') {
      	  email_state = true;
      	  $('#email').parent().removeClass();
      	}
      }
 	});
 });

 $('#button').on('click', function(){
 	var username = $('#userid').val();
 	var email = $('#email').val();
 	var password = $('#password').val();
 	if (username_state == false || email_state == false) {
	  $('#error_msg').text('Fix the errors in the form first');
	}else{
      // proceed with form submission
      $.ajax({
      	url: '/auth/register',
      	type: 'post',
      	data: {
		'name':$('#name').val();
      		'email' : email,
      		'userid' : userid,
      		'password' : password,
      	},
      	success: function(response){
      		alert('user saved');
      		$('#userid').val('');
      		$('#email').val('');
      		$('#password').val('');
      	}
      });
 	}
 });
});
