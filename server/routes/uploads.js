module.exports = function(http, socket, dataBase) {
    const io = socket(http); 
    var rooms = []; 
    var messages = {}; 
    var users = []; 
    io.on('connection', function(socket) {
        // add the user name and socket id to a list of online users and remove them when they are disconnected
        //users.append()
       socket.on('list of rooms', ()=> {
            socket.emit('list of rooms', rooms);
       });
       socket.on('new-message', function(message, room) { 
           var response = {}; 
           response.name = message.name; 
           response.message = message.message;
           console.log(` room is ${room}`)
           io.in(room).emit('message sent', message); 
       }); 

       // when a client goes toa  room they call the socket on join
       // which puts the client (socket) in a list of clients. when we emit to a room only the sockets in that list will be able to hear us
       socket.on('join', (data) =>{
           var name = data.username;
           var roomName = data.room; 
          users.push({'name': name,'room' : roomName, 'id': socket.id});
          console.log(users);
           socket.join(roomName); 
           var listOfPeopleInGroup = []; 
           // get the list of people in a group
           for(var i = 0; i < users.length; i++) {
               if(users[i].room == roomName) {
                   listOfPeopleInGroup.push(users[i].name);
               }
           }
           io.in(roomName).emit('list of names in group', listOfPeopleInGroup);
       })

       socket.on('disconnect', () => {
           //var name ; 
           var room; 
           for (var i = 0; i < users.length;i++) {
                if (users[i].id == socket.id) {
                    room = users[i].room;
                    users.splice(i,1);
                }
           }
           var listOfPeopleInGroup = []; 
           // get the list of people in a group
           for(var i = 0; i < users.length; i++) {
               if(users[i].room == room) {
                   listOfPeopleInGroup.push(users[i].name);
               }
           }
           io.in(room).emit('list of names in group', listOfPeopleInGroup);
            
       })

       socket.on('delete room', () => {
           console.log('room deleted'); 
       })

       // todo remove someone from a group


       //todo delete group 

       
       // new room created, 
       // todo check to see if soomeone has the right permissions first 
       socket.on('room', (data) => {
            rooms.push(data) ; 
            io.emit('new-room', data);
            
        
       })
           
    });
   
   
   
   }