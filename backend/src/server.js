import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './db/db.js'
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'
import { verifyJWT } from './middlewares/auth.middleware.js'

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

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsoptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsoptions));

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', verifyJWT, productRoutes)