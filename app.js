const express=require("express");
const socket=require("socket.io");

const app=express();  // initialized and server ready

app.use(express.static("public"));
let port=process.env.PORT || 3001;
let server=app.listen(port, ()=>{
    console.log("Listening to port" + port);
})
let io = socket(server);

io.on("connection", (socket)=>{
    console.log("Made socket connection");
    // data from frontend
    //received data
    socket.on("beginPath",(data)=>{
     //now transfer data to all connected computers
     io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke",(data)=>{
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data)=>{
      io.sockets.emit("redoUndo", data); 
    })
})

