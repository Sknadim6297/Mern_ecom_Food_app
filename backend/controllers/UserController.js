import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';



const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1hr'});
}


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists =await User.findOne({email})
        if(exists){
            return res.status(400).json({message:"User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid Email"});
        }
    
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser=new User({
            name,
            email,
            password:hashedPassword
        }); 
        const user = await newUser.save();
        const token=createToken(user._id);
        res.json({success:true ,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error registering user"});
        
    }
}

 

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  try {
    const user=await User.findOne({email});
    if(!user){
        return res.json({success:false,message:"User not found"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({success:false,message:"Invalid Credentials"});
    }
    const token=createToken(user._id);
    res.json({success:true,token});

  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error logging in user"});
  }
}
