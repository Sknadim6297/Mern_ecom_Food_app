import Food from "../models/foodModel.js";
import fs from 'fs';


//add food item
export const addFood = async (req,res)=>{

   if(!req.file){
      return res.status(400).json({success:false,message:'Image file is required'}); 
   }

   const Imagefilename = req.file.filename;

   const food =new Food({
    name:req.body.name,
    category:req.body.category,
    image:Imagefilename,
    price:req.body.price,
    desc:req.body.desc,
   });
   try {
    await food.save();
    res.json({success:true,message:'Food item added successfully'});
    
   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
    
   }
}

export const listFood= async(req,res)=>{
   try {
      const foods=await Food.find({});
      res.json({success:true,data:foods});

   } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message});
   }
}

export const removeFoodItem=async (req,res)=>{
   const { image } = req.body;
   try {
      const food=await Food.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`,(err)=>{
         if(err){
            console.log(err);
         }
      });   

      await Food.findByIdAndDelete(req.body.id);
      res.json({success:true,message:'Food item removed successfully'});
      
   } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message});
   }
   
}
