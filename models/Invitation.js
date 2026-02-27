import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({

 senderId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 receiverId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 status:{
  type:String,
  default:"pending"
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

});

export default mongoose.model("Invitation",invitationSchema);