import mongoose from "mongoose";    


 export const connetDb=async () =>{
    await mongoose.connect('mongodb+srv://sknadim6297:Nadeem@nadeem.cl2gf.mongodb.net/?retryWrites=true&w=majority&appName=Nadeem',{
    });
    console.log('Database connected');
}   
    