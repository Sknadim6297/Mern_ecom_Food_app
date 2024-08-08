import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";


const router = express.Router();

router.post('/add',authMiddleware, addToCart);
router.post('/remove',authMiddleware,removeFromCart);
router.post('/get', authMiddleware,getCart);  

export default router;