$(document).ready(function() {
    $("#userid").on('keyup input',function(){

    var username = $(this).val().trim();
    username = username.toLowerCase();
    var username_state = 0;
    var regex = /[^\w]/gi;
    if(regex.test(username) == true) {
          $("#error_msg").html('Your search string contains illegal characters.');
          return false;
    }
    else if(username.length<3){
        $("#error_msg").html('userid length must be at least 3 characters long')
        return false;
    }

  else{
    $("#error_msg").html('')
  }
})
});