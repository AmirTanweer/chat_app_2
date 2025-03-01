const express=require('express');
const connectDB = require('./db');
const cors=require('cors')
const UserRoute=require('./routes/User.Route')
const app=express();
const port=5000;
app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    res.send("hello kdsla world this is amir");
})
app.use('/api/auth',UserRoute)
connectDB()
app.listen(port,()=>{
    console.log("Server is running on Port ",port);
})
