import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './database/db.js';
import userRoutes from './routes/user.route.js';
import courseRoutes from './routes/course.route.js';
import courseProgressRoutes from './routes/courseProgress.route.js';
import coursePurchaseRoutes from './routes/courseProgress.route.js';

dotenv.config();

const app=express();
const PORT = process.env.PORT;

//rate limiting
const limiter=rateLimit({
    windowMs:15*60*1000,
    limit:100,
    message:"Too many request from this IP, please try later"
})

app.use('/api',limiter);


app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:true, limit:"10kb"}));
app.use(cookieParser());


//cors
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH","HEAD","OPTIONS"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "X-Requested-Width",
        "device-remember-token",
        "Access-Control-Allow-Origin",
        "Origin",
        "accept"
    ]
})) 


    app.get('/', (req, res) => {
  res.send('SkillMatrix backend');
})


//routes
app.use("/api/user",userRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/courseProgress",courseProgressRoutes);
app.use("api/purchase",coursePurchaseRoutes);


//404 handler
app.use((req,res)=>{
    res.status(404).json({status:"error",message:"Route not found"});
})


const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected Successfully");
   app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV} mode`);
})
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
