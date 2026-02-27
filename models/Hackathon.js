import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({

 title:String,

 description:String,

 organizer:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },
  prize:{
  type:String
 },

 deadline:{
  type:String
 }


});

export default mongoose.model(
 "Hackathon",
 hackathonSchema
);