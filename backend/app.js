import express from 'express';
import dotenv from 'dotenv';
import connectDB from './databse/db.js';
import bookMarkModel from './schema/schema.js';
import router from './routes/bookmarks.routes.js';
dotenv.config();
const app=express();

app.use('/',router);

connectDB()
.then(()=>{
    console.log("Database Connected");
    app.listen(5000,()=>{
        console.log("Server is running on http://localhost:5000")
    })
})

