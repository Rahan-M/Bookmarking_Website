import express from 'express';
import dotenv from 'dotenv';
import connectDB from './databse/db.js';
import bookmarksRouter from './routes/bookmarks.routes.js';
import foldersRouter from './routes/folders.routes.js';
dotenv.config();
const app=express();

app.use(express.json());

app.use('/api/bookmarks',bookmarksRouter);
app.use('/api/folders',foldersRouter);

connectDB()
.then(()=>{
    console.log("Database Connected");
    app.listen(5000,()=>{
        console.log("Server is running on http://localhost:5000")
    })
})

