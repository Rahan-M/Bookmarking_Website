import express from 'express';
import dotenv from 'dotenv';
import connectDB from './databse/db.js';

dotenv.config();
const app=express();

connectDB()
.then(()=>{
    console.log("Database Connected");
    app.listen(5000,()=>{
        console.log("Server is running on localhost 5000")
    })
})

