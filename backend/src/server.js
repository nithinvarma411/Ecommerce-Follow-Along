import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'

dotenv.config({path: './.env'});
const app = express()

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server is running at port", process.env.PORT || 5000);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });
