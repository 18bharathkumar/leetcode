import express  from "express";
import { ConnectToDb } from "../db.js";
import verifyToken from "../middlewares/verifytoken.js";
import User from "../models/User.js";

const router = express.Router();

router.get('/', verifyToken, async (req,res)=>{
    try {
        await ConnectToDb();
        const email = req.user.email;
        const user = await User.findOne({email:email});
        
        res.status(200).json(user);  
    } catch (error) {
        console.log(error);
        throw error;
        
        
    }
}) 

export default router;