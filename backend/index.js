const express=require('express');
const connectDB = require('./db');
const app=express();
const port=5000;

app.get('/',(req,res)=>{
    res.send("hello kdsla world this is amir");
})
connectDB()
app.listen(port,()=>{
    console.log("Server is running on Port ",port);
})
