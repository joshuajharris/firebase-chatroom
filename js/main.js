var refUrl = "https://joshuajharris-chat.firebaseio.com/messages";  
var ref = new Firebase(refUrl);

$(document).ready(function(){

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
  });
  
  $('#message').keypress(function(e) {
    if (e.charCode === 13) {
      if($("#username").val().length > 0) {
        var currentDate = new Date();
        var time = //currentDate.getDate() + "/" +
                   //(currentDate.getMonth() + 1) + "/" +
                   //currentDate.getFullYear() + " @ " +
                   currentDate.getHours() + ":" +
                   currentDate.getMinutes() + ":" +
                   currentDate.getSeconds();
        ref.push({author: $('#username').val(), timestamp: time, text:$('#message').val()});
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
