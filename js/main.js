var refUrl = "https://joshuajharris-chat.firebaseio.com/messages";  
var ref = new Firebase(refUrl);

$(document).ready(function(){

  ref.on("value", function(snapshot){
    var messages = snapshot.val();
    $.each(messages, function(i, message){
      $('#chat-log').append(
        "<div>" +
          "<b>" + message.author + " - " + message.timestamp + "</b>" +
          "<p>" + message.text + "</p>" +
        "</div>"
      );
    });
  });
  
  $('#message').keypress(function(e) {
    if (e.charCode === 13) {
      var currentDate = new Date();
      var time = currentDate.getDate() + "/" +
                 (currentDate.getMonth() + 1) + "/" +
                 currentDate.getFullYear() + " @ " +
                 currentDate.getHours() + ":" +
                 currentDate.getMinutes() + ":" +
                 currentDate.getSeconds();
      ref.push({author: $('#username').val(), timestamp: time, text:$('#message').val()});
      $('#message').val('');
      return false;
    }
  });

});
