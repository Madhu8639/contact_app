import asynchandler from "express-async-handler"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import errorHandler from "../middleware/errorhandler.js";

//@desc register user
//@route Post /users/register
//@access public 
const registerUser = asynchandler(async (req,res) => {
    const {username, email, password} = req.body 
    if (!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory!")
    }
    const userAvailable = await userModel.findOne({email})
    if (userAvailable){
        res.status(400)
        throw new Error("user already existed")
    }
    const hashedpassword  =await bcrypt.hash(password,10)
    console.log("Hashed Password", hashedpassword)
    const user = await userModel.create({
        username,
        email,
        password:hashedpassword
    })
    console.log(`user created ${user}`)
    if (user){
        res.status(201).json({_id:user.id,email:user.email})
    }
    else{
        res.status(400)
        throw new error("user not valid")
    }
    res.json({message:"register the user"});
})

//@desc login user
//@route Post /users/login
//@access public 
const loginUser = asynchandler(async (req,res) => {
    const {email,password} = req.body
    if (!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user  = await userModel.findOne({email})
    if (user && (await bcrypt.compare(password,user.password))){
       const accesstoken = jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user.id,
        },
       }, process.env.ACCESS_SECRET,
    {expiresIn: "15m"})
    res.status(200).json({accesstoken})
    }
    else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
    res.json({message:"login the user"});
})

//@desc current user
//@route Post /users/current
//@access private 
const currentUser = asynchandler(async (req,res) => {
    res.json({message:"current user information"});
})

export {registerUser, loginUser, currentUser}