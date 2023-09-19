const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');

const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new SocketIO.Server(server);
app.use(cors({
    origin: 'http://localhost:5173',
}));

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


let counter = 0;

io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.emit('updateCounter', counter);

    socket.on('incrementCounter', ()=>{
        counter++;
        io.emit('updateCounter', counter);
    });

    socket.on('disconnect', ()=>{
        console.log('a user disconnected');
    })
})
app.get('/', (req,res)=>{
    counter++;
    io.emit('Counter', counter);
    res.send(JSON.stringify({counter}))
})

