import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

 name:String,

 email:{
  type:String,
  unique:true
 },

 password:String,

 role:{
  type:String,
  enum:["candidate","organizer"]
 },
 history:[

{

 hackathon:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"Hackathon"
 },
 lookingForTeam:{
 type:Boolean,
 default:true
},

teamMembers:[
 {
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 }
],

 teamId:String

}

]

});

export default mongoose.model("User",userSchema);