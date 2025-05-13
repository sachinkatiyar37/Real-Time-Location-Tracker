const express=require('express');
const app=express();
const socketio=require('socket.io');
const path=require('path');
const http=require('http');
const server=http.createServer(app);

const io=socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on('connection',function(socket){
    socket.on('send-location',(data)=>{
        io.emit("receive-location",{id:socket.id,...data})
    });
    console.log("connected");
})
app.get('/',(req,res)=>{
    res.render('index');
})

server.listen(8080,()=>{
    console.log('server is running');
})
