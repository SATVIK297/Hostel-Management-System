import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import serviceRoutes from './routes/service.route.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
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

const corsOptions = {
  origin: true,      // Allows all origins
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);




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

