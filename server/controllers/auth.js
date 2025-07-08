import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// basic register function
export const register = async (req, res) =>{
    try{
        const { email, username, password} = req.body;
        const usernameExists = await Users.findOne({username: username});
        const emailExists = await Users.findOne({email: email});
        if (usernameExists || emailExists){
            return res.status(404).json({success: false, message: "User already exists"})
        } 
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new Users({
            email: email,
            username: username,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(200).json({success: true, message: "successfully registered user"});

    }
    catch(error){
        console.log("register error");
        return res.status(500).json({success: false, message: "Register Error:" + error});
    }
}

// basic login function

export const login = async (req, res) => {
    try{
        // can take either email or username
        const {identifier, password} = req.body;
        const secret = process.env.JWT_SECRET;
        const user = await Users.findOne({
            $or: [{email: identifier}, {username: identifier}]
        });
        if (!user){
            return res.status(404).json({success: false, message: "user does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).json({success: false, message: "wrong password"});
        }
        const token = jwt.sign({userId: user._id}, secret, {expiresIn: '1h'});
        return res.status(200).json({success: true, token, message: "successfully logged in user"})
    }
    catch(error){
        console.log("login error")
        return res.status(500).json({success: false, message: "Login Error: " + error});
    }
}