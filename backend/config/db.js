import mongoose from "mongoose";    


 export const connetDb=async () =>{
    await mongoose.connect('mongodb://localhost:27017/FoodEcomWebsite',{
    });
    console.log('Database connected');
}   
    