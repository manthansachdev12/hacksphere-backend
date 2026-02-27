import Application from "../models/Application.js";
import User from "../models/User.js";

export const applyHackathon=async(req,res)=>{

 try{


 const teamId =

 "TEAM-"+Math.floor(
  1000+Math.random()*9000
 );


 const application=

 await Application.create({

 teamId,

 hackathon:req.params.id,

 user:req.user,

 ...req.body

 });



 // Save History in User

 await User.findByIdAndUpdate(

 req.user,

 {

  $push:{

   history:{

    hackathon:req.params.id,

    teamId

   }

  }

 }


 );


 res.json(application);


 }
 catch(error){

 console.log(error);

 res.status(500).json("Error");

 }

};



export const getApplications =
async(req,res)=>{

 const apps =
 await Application.find({
  hackathon:req.params.id
 });

 res.json(apps);

};

export const getMyApplications = async(req,res)=>{

 try{

 const apps = await Application.find({
  user:req.user
 }).populate("hackathon");

 res.json(apps);

 }
 catch(error){

 console.log(error);

 res.status(500).json("Error");

 }

};