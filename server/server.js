const express=require('express') ;
const app = express(); 
const path = require('path'); 
//const form = require('formidable'); 
const cors = require('cors');
const socket = require('socket.io'); 
const bodyParser = require('body-parser'); 

app.use(bodyParser.json()); 
app.use(cors());  


const dataBase = {
    "Puffy": {password : '123', profileName: "cotton Candy", priority :'1', online: '0'},
    "Luffy": {password : '123', profileName: 'Terrorist Buddy', priority: '2', online:'0'}
}
const http = require('http').createServer(app)
app.post('/api/login', function(req, res){
    var response = {};
    if (!req.body) {
        response.response = 0 
        return res.send(response)
    }
    if(dataBase[req.body.name]) {
        if ((dataBase[req.body.name].password == req.body.password) && (dataBase[req.body.name].online == '0')) {
            response.response = 1;
            response.profile = dataBase[req.body.name].profileName 
            response.priority = dataBase[req.body.name].priority
            dataBase[req.body.name].online='1'
            return res.send(response);
        } else if (dataBase[req.body.name].online == '1') {
            response.response = 2; 
            return res.send(response);
        } else {
            response.response = 0; 
            return res.send(response);
        }
    } else {
        response.response = 0; 
        return res.send(response);
    }
});


require('./routes/uploads.js')(http, socket, dataBase);
require('./routes/listen.js')(http); 