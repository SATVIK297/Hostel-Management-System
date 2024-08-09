import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import cors from 'cors';
import bodyParser from 'body-parser';

// Use the json function in your code

dotenv.config();

mongoose.connect(process.env.MONGODB).then(
  ()=>{
    console.log("connected database");
  }
)
.catch((err)=>{
  console.log(err,"failed to connect");
})


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes);




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error happened';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});



app.listen(process.env.PORT ||5000,()=>{
  console.log("server is running   ");
})