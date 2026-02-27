import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

 teamId:String,

 hackathon:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Hackathon"
 },

 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 teamName:String,
 teamSize:Number,

 leaderName:String,
 leaderEmail:String,
 leaderPhone:String,

 college:String,

 idea:String,
 skills:String,
 github:String,
 linkedin:String,

 members:Array

});

export default mongoose.model(
 "Application",
 applicationSchema
);