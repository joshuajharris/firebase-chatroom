var refUrl = "https://joshuajharris-chat.firebaseio.com/messages";  
var ref = new Firebase(refUrl);

$(document).ready(function(){

  ref.authWithOAuthPopup("github", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });

  ref.on("value", function(snapshot){
    $('#chat-log').empty();

    var messages = snapshot.val();
    $.each(messages, function(i, message){
      $('#chat-log').append(
        "<div>" +
          "<b>" + message.author + " @ " + message.timestamp + "</b>" +
          "<p>" + message.text + "</p>" +
        "</div>"
      );
    });
    $('#chat-log').animate({ scrollTop: $('#chat-log')[0].scrollHeight}, 1000);
  });
  
  $('#message').keypress(function(e) {
    if (e.charCode === 13) {
      if($("#message").val().length > 0) {
        var currentDate = new Date();
        var time = //currentDate.getDate() + "/" +
                   //(currentDate.getMonth() + 1) + "/" +
                   //currentDate.getFullYear() + " @ " +
                   currentDate.getHours() + ":" +
                   currentDate.getMinutes() + ":" +
                   currentDate.getSeconds();
        //ref.push({author: $('#username').val(), timestamp: time, text:$('#message').val()});
        ref.push({author: authData.github.username, timestamp: time, text:$('#message').val()});
        $('#message').val('');
        $('#errors').empty();
      } else {
        postError("You must set your name");
      }
      return false;
    }
  });

  function postError(errorMsg) {
    $('#errors').append(
      '<div class="alert alert-danger">' +
        errorMsg +
      '</div>'
    );
  }

});
