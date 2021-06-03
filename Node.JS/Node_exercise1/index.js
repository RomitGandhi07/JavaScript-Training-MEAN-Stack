const names=require("./routes/names");
const mongoose = require('mongoose');
const express=require('express');
const app=express();
const socketio = require('socket.io');
const axios =  require('axios');
const http = require('http');
const server = http.createServer(app);

mongoose.connect("mongodb+srv://Romit:DemoPassword@cluster0.liiey.mongodb.net/Exercise1?retryWrites=true&w=majority")
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.error("Coudn't connect to MongoDB"));

app.use(express.json());
app.use(express.static('public'));

const io = socketio(server);

io.on('connection',(socket)=>{
    socket.on('join', ()=>{
        
        http.get({
            hostname: 'localhost',
            port: 5000,
            path: '/api/names',
            agent: false  // Create a new agent just for this one request
          }, (res) => {

            let data = ""

            res.on("data", d => {
              data += d
            })
            res.on("end", () => {
                socket.emit('names', JSON.parse(data));
              })
          });
    })

    socket.on('action',()=>{
        http.get({
            hostname: 'localhost',
            port: 5000,
            path: '/api/names',
            agent: false  // Create a new agent just for this one request
          }, (res) => {

            let data = ""

            res.on("data", d => {
              data += d
            })
            res.on("end", () => {
                io.emit('names', JSON.parse(data));
              })
          });
    })
})


app.use("/api/names",names);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}...`));