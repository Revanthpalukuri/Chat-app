const express = require('express');
const app=express();
const http=require("http");
const cors=require("cors");

const { Server } = require("socket.io");
app.use(cors());
const server=http.createServer(app);

//create socket.io server
const io=new Server(server,{
    cors:{
         origin:"http://localhost:3000",
         method:["GET,POST"]
    }
});

io.on("connection",(socket)=>{
    console.log(`user connected - ${socket.id}`);
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`user with id: ${socket.id} joined room : ${data}`);
    })
    socket.on("send-message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
        console.log(data);
    })
    socket.on("disconnect",()=>{
        console.log('user disconnected',socket.id);
    })
})

server.listen(3001,()=>{
    console.log('server runing at port http://localhost:3000');
})
