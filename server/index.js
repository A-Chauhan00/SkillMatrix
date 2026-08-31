import express from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import courseRoutes from './routes/course.route.js';
import courseProgressRoutes from './routes/courseProgress.route.js';
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
app.use(helmet());

//logger middleware
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'));
}


app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:true, limit:"10kb"}));
app.use(cookieParser());


//global error handler
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(err.status||500).json({
        status:"error",
        message:err.message||"internal server error",
        ...(process.env.NODE_ENV==='development' && {stack:err.stack})
    })
})

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

//routes
app.use("/api/user",userRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/courseProgress",courseProgressRoutes)


//404 handler
app.use((req,res)=>{
    res.status(404).json({status:"error",message:"Route not found"});
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV} mode`);
})