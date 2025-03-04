const express=require('express');

const http=require('http')
const {Server}=require('socket.io')
const connectDB = require('./db');
const cors=require('cors')

const UserRoute=require('./routes/User.Route')
const ChatRoute=require('./routes/Chat.Route')
const MessageRoute=require('./routes/Message.Route')

const app=express()
const port=5000;

connectDB()

app.use(express.json());
app.use(cors())

//Create an HTTP server
const server=http.createServer(app)

//Initialize socket.io with CORS
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',//frontend URL
        method:["GET","POST"],
    },
})

// Socket.io connection event
io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);

    //Join a chat room

    
    // user connected
    socket.on('username',(name)=>{
      console.log("username -> ",name)
    })
    //Handle sending Message
      socket.on('message',(msg)=>{
        console.log("message -> ",msg)
        io.emit('message',msg);
      })
    //Handle disconnection
    socket.on("disconnect",()=>{
        console.log(`User Disconnected: ${socket.id}`)
    })
})


app.get('/',(req,res)=>{
    res.send("hello kdsla world this is amir");
})
app.use('/api/auth',UserRoute)
app.use('/api/chat',ChatRoute)
app.use('/api/message',MessageRoute)
server.listen(port,()=>{
    console.log("Server is running on Port ",port);
})
