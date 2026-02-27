import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res)=>{

 const {name,email,password,role}=req.body;

 const hashedPassword =
 await bcrypt.hash(password,10);

 const user=await User.create({

  name,
  email,
  password:hashedPassword,
  role

 });

 res.json(user);

};


export const loginUser=async(req,res)=>{

 const {email,password}=req.body;

 const user=await User.findOne({email});

 if(!user)
 return res.json("User not found");

 const match=
 await bcrypt.compare(
  password,
  user.password
 );

 if(!match)
 return res.json("Wrong Password");


 const token=jwt.sign({

  id:user._id

 },process.env.JWT_SECRET);

 res.json({

  token,
  role:user.role

 });

};