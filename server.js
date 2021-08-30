const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require('path');

dotenv.config();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const port = process.env.PORT || 5000;

io.on('connection',(socket)=>{
    socket.on('POLL_UPDATE',(data)=>{
        io.emit('POLL_UPDATE',data);
        socket.broadcast.emit('POLL_UPDATE',data);
    })
})


app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

http.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

