import mongoose from "mongoose";    


 export const connetDb=async () =>{
    await mongoose.connect('mongodb+srv://sknadim6297:i65KtFozDWRdkk04@mern-food-app.xlhmh1m.mongodb.net/',{
    });
    console.log('Database connected');
}   
    