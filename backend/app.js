import express from 'express';
import dotenv from 'dotenv';
import connectDB from './databse/db.js';
import bookmarksRouter from './routes/bookmarks.routes.js';
import foldersRouter from './routes/folders.routes.js';
import usersRouter from './routes/users.routes.js';
import cors from 'cors';
dotenv.config();
const app=express();


app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173", // Allow requests only from your frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies if needed
  };
  
app.use(cors(corsOptions));

app.use('/api/bookmarks',bookmarksRouter);
app.use('/api/folders',foldersRouter);
app.use('/api/users', usersRouter);

connectDB()
.then(()=>{
    console.log("Database Connected");
    app.listen(5000,()=>{
        console.log("Server is running on http://localhost:5000")
    })
})

