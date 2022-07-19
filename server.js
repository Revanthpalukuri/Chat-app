const express = require('express');
const path = require('path');

const app=express();
const http=require('http').createServer(app);

app.use(express.static(path.join(__dirname,'public')));

const io=require('socket.io')(http) 

io.on('connection',(socket)=>{
    console.log('connection ready');
    socket.on('sendMessage',(msg)=>{
        // console.log(msg);
        socket.broadcast.emit('sendToAll',msg); // .broadcast anedi vaadiki tappa andariki velladanikii
    })
})


const PORT=3000;
http.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
