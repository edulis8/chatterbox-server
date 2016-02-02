var app = {}; // define app

$(document).ready(function(){
  app.latestTime;
  app.startTime;
  app.lastMessage;
  app.objectIds = [];
  app.rooms = [];
  app.friends = [];

  app.server = 'http://127.0.0.1:3000/classes/messages';

  app.myescape = function(str){
    // str = JSON.stringify(str);
    return '&#x2F;'+str+'&#x2F;';
  };

  app.init = function(){
    app.username = "steven-ian";
    // app.fetch();
    app.send();
    setTimeout(function(){
      // console.log(app.startTime+' is start time');
      app.fetch(app.latestTime);
    }, 300);
    
    // window.setInterval(function(){
    //   // console.log("latestTime", app.latestTime);
    //   app.fetch(app.latestTime)}, 400);
  };

  app.send = function(inputMessage){
    var textBody = $('#mymessagebody').val() || ''
    app.startTime;
    var message = inputMessage ||
      {
      username : 'pizza',
      text : app.myescape(textBody),
      roomname: 'lobby'
    };
    $.ajax({
      //////////SEND//////////////
      type: 'POST',
      url: app.server,
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: function(data){
        console.log('Input message:', inputMessage);
        console.log('POST successful, data: ' + data);
        
        var temp = data.objectId.slice();
        app.startTime = data.createdAt;
      },
      error: function(response){
        console.log(response);
      }
    });
    // clears textbox
    $('#mymessagebody').val('');
  
  };
    ////////////////FETCH////////////////

  app.fetch = function(timeStamp){
    $.ajax({
        url: app.server,
        // tip from https://parse.com/questions/how-to-sue-ajax-to-hit-the-rest-api
        // data: 'where={"createdAt":{"$gte":"' + app.startTime + '"}}',
        // data: 'where={"createdAt":{"$gte":"2012-09-10T12:00:00Z"}}}',
        type: 'GET',
        contentType: 'application/json',
        success: function(data){
          var tempRooms = [];
          // latest msg goes top
          console.log("Fetched. Data:", data);

          var parsed = JSON.parse(data);
          console.log('JSONparsed Data', parsed);
          console.log('JSONparsed username', parsed.results[0].username);

          var sortedArr = data.results.reverse();
          _.each(sortedArr, function(msg, i){
            if(app.objectIds.indexOf(msg.objectId) === -1){
              tempRooms.push(msg.room);
              app.objectIds.push(msg.objectId);
              app.addMessage(msg);
            }
          });
          // populate return unique rooms
          app.rooms = _.uniq(tempRooms);
          _.each(app.rooms, function(room){
            if(room !== undefined){
              app.addRoom(room);
            }
          });

          app.latestTime = sortedArr[sortedArr.length-1].createdAt;
          },

        error: function(response){
          console.log("ERROR: "+JSON.stringify(response));
        }
      }
    );
  };

  app.clearMessages = function(){
    $('#chats').remove();
  };

  app.addRoom = function(room){
    $('#roomSelect').append($('<option></option').val(room).html(room));
  };

  app.addMessage = function(msg){
    $('#chats').prepend('<div class="list-group-item"><a style="cursor:pointer; color:blue;" class="username">@' + msg.username + '</a>: ' + msg.text + '&nbsp<span data-livestamp="'+msg.createdAt+'"></span></div>');
    // console.log($('#chats').children().length);

    // submit button
  };
  
  app.addFriend = function(name){
    
    if(!_.contains(app.friends, name)){
      app.friends.push(name);
    }
  };
  
  // adds user to friends array when username is clicked
  $('body').on('click', '.username', function(){
    app.addFriend($(this).text().substring(1)); // @
    console.log(app.friends);
  });

  app.handleSubmit = function(){
    return app.send();
  }

  $('#send').on('click', function(){
    $('.message').append(JSON.stringify(app.handleSubmit()));
    console.log($('#mymessagebody').val()); // get text in text area
  });
  
  $('#addRoomButton').on('click', function(){
    app.addRoom($('#addRoom').val());
    // to implement channel filtering
  });


  
  app.init();

});