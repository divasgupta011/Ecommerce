import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//user register
export const register = async (req, res)=>{
    const { name, email, password } = req.body;
    
    try {
        let user = await User.findOne({email});
        if(user) 
            return res.json({message: "User already exist", success:false});
        const hashPassword = await bcrypt.hash(password, 10);
            user = await User.create({name, email, password: hashPassword});
        res.json({message:"User registered successfully ... "});
    } catch (error) {
        res.json({message: error.message});
    }
}

//user login
export const login  = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) return res.json({message: "User not found", success:false});
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.json({message: "Invalid password", success: false});

        const token = jwt.sign({userId:user._id}, "!@#$%^&*()", {
            expiresIn:"2h"
        })

        res.json({message:`Welcome ${user.name}`, token, success:true}); 
    } catch (error) {
        res.json({message: error.message});
    }
}

//get all users
export const users = async (req, res) => {
    try {
        let user = await User.find().sort({createdAt: -1});
        res.json(user);
    } catch (error) {
        res.json({message: error.message});   
    }
}


// get profile
export const profile = async (req, res)=>{
    res.json({user:req.user});
}