import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/auth.routes.js';
import shortenerRoute from './routes/shortener.routes.js';
import requestIp from "request-ip";
import {connectDB} from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(requestIp.mw());

const port = process.env.PORT || 3000;

app.use(cors({
    origin: "https://url-shortlyy.vercel.app",
    credentials: true
  }));
  
app.use('/api/user', userRoute); 
app.use('/api/url', shortenerRoute);

// Start the server
connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
})
.catch((err) => {
    console.log(err);
});
