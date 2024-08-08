import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const port =4000;
import { connetDb } from './config/db.js';
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/UserRoute.js';
import cartRouter from './routes/CartRoute.js';

dotenv.config();

const app=express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


connetDb();

app.get('/',(req,res)=>{
    res.send('Hello World');
}
);
app.use('/api/user',userRouter);
app.use('/api/food',foodRouter);
app.use('/api/cart',cartRouter);
app.use('/images',express.static('uploads'));



app.listen(port,()=>{
    console.log('Server is running on port 4000');
});
