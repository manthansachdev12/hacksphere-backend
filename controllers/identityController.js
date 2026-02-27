import Identity from "../models/Identity.js";
import User from "../models/User.js";


/* ================= SAVE IDENTITY ================= */

export const saveIdentity = async (req,res)=>{

 try{

  // Middleware sets req.user = decoded.id
  const userId = req.user;

  if(!userId){
   return res.status(401).json({
    message:"User not authenticated"
   });
  }


  const {
   college,
   branch,
   year,
   phone,
   skills,
   github,
   linkedin
  } = req.body;


  let identity = await Identity.findOne({
   user:userId
  });


  // If identity already exists → update
  if(identity){

   identity.college = college;
   identity.branch = branch;
   identity.year = year;
   identity.phone = phone;
   identity.skills = skills;
   identity.github = github;
   identity.linkedin = linkedin;

   await identity.save();

   return res.json(identity);
  }


  // If new identity → create
  identity = await Identity.create({

   user:userId,
   college,
   branch,
   year,
   phone,
   skills,
   github,
   linkedin

  });


  res.json(identity);


 }catch(err){

  console.log("SAVE ERROR:",err);

  res.status(500).json({
   message:"Server Error"
  });

 }

};



/* ================= CHECK IDENTITY ================= */

export const checkIdentity = async (req,res)=>{

 try{

  const userId = req.user;

  if(!userId){
   return res.status(401).json({
    message:"User not authenticated"
   });
  }


  const identity = await Identity.findOne({
   user:userId
  });


  if(identity){

   return res.json({
    exists:true,
    identity
   });

  }


  res.json({
   exists:false
  });


 }catch(err){

  console.log("CHECK ERROR:",err);

  res.status(500).json({
   message:"Server Error"
  });

 }

};



/* ================= GET PROFILE ================= */

export const getProfile = async (req,res)=>{

 try{

  const userId = req.user;

  if(!userId){
   return res.status(401).json({
    message:"User not authenticated"
   });
  }


  const identity = await Identity.findOne({
   user:userId
  });


  const user = await User.findById(userId);


  res.json({

   name:user?.name || "",
   email:user?.email || "",

   college:identity?.college || "",
   branch:identity?.branch || "",
   year:identity?.year || "",

   phone:identity?.phone || "",
   skills:identity?.skills || "",

   github:identity?.github || "",
   linkedin:identity?.linkedin || ""

  });


 }catch(err){

  console.log("PROFILE ERROR:",err);

  res.status(500).json({
   message:"Server Error"
  });

 }

};