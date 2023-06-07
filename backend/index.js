import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
const path = require('path');
import cookieParser from 'cookie-parser';
import tourRoute from "./routes/tours.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";






dotenv.config()
const app = express()
const port = process.env.PORT || 8000 ;
const corsOptions = {
    origin:true,
    credentials:true
}

// database connection 
mongoose.set("strictQuery", false);
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("MongoDB database connected");
    } 
    catch 
       (error){
        console.log("MongoDB database connection failed");
    }
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));   
app.use(cookieParser());
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

//static files
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});


app.listen(port, () => {    
    connect();
    console.log("server listening on port", port);

});
