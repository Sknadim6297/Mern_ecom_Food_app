import express from 'express';
import { addFood, listFood, removeFoodItem } from '../controllers/foodController.js';
import multer from 'multer';
import fs from 'fs';
const foodRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename:(req,file,cb)=>{
        return cb(null, Date.now()+ '-' +file.originalname);
    },
});

const upload = multer({
    storage: storage
});
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

foodRouter.post('/add',upload.single('image'),addFood);
foodRouter.get('/list',listFood);
foodRouter.post('/remove',removeFoodItem)

export default foodRouter;