import Hackathon from "../models/Hackathon.js";


// Create Hackathon

export const createHackathon = async(req,res)=>{

 try{

 const hackathon =
 await Hackathon.create({

  title:req.body.title,

  description:req.body.description,

  organizer:req.user

 });

 res.json(hackathon);

 }
 catch(error){

 console.log(error);

 res.status(500).json("Error creating hackathon");

 }

};



// Get All Hackathons (Candidate View)

export const getHackathons = async(req,res)=>{

 try{

 const hackathons =
 await Hackathon.find();

 res.json(hackathons);

 }
 catch(error){

 console.log(error);

 res.status(500).json("Error");

 }

};



// Get Organizer Hackathons

export const getMyHackathons = async(req,res)=>{

 try{

 const hackathons =
 await Hackathon.find({

  organizer:req.user

 });

 res.json(hackathons);

 }
 catch(error){

 console.log(error);

 res.status(500).json("Error");

 }

};