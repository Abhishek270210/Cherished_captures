import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/postroute.js'
import userRoutes from './routes/userRoute.js';

const app=express();
const PORT=process.env.PORT||5000;

dotenv.config();

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

mongoose.connect(process.env.DATABASE_CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("database is connected successfully !!");
    }
})
mongoose.set('useFindAndModify', false);

app.get('/',(req,res)=>{
    res.send("This server is runnig !!!");
})


app.use('/posts',postRoutes);
app.use('/users',userRoutes);


app.listen(PORT,(err)=>{
   if(err){
       console.log(err);
   }
   else{
      console.log("server is started !!");
   }
})



