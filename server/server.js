const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

dotenv.config();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const port = process.env.PORT;

io.on('connection',(socket)=>{
    socket.on('POLL_UPDATE',(data)=>{
        io.emit('POLL_UPDATE',data);
        socket.broadcast.emit('POLL_UPDATE',data);
    })
})

http.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
