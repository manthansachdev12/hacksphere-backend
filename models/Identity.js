import mongoose from "mongoose";

const identitySchema = new mongoose.Schema({

 user:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
},

 college:String,

 branch:String,

 year:String,

 phone:String,

 github:String,

 linkedin:String,

 skills:String,

});

export default mongoose.model(
 "Identity",
 identitySchema
);