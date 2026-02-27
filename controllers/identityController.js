import Identity from "../models/Identity.js";
import User from "../models/User.js";


// Helper function (critical fix)
const getUserId = (req) => {

 if(req.user?.id) return req.user.id;

 if(req.user?._id) return req.user._id;

 if(req.user?.userId) return req.user.userId;

 return null;

};



// ================= SAVE =================

export const saveIdentity = async (req,res)=>{

 try{

  const userId = getUserId(req);

  if(!userId){

   return res.status(400).json({
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

  res.status(500).json(err);

 }

};



// ================= CHECK =================

export const checkIdentity = async (req,res)=>{

 try{

  const userId = getUserId(req);


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

  res.status(500).json(err);

 }

};



// ================= PROFILE =================

export const getProfile = async (req,res)=>{

 try{

  const userId = getUserId(req);

  console.log("PROFILE USER ID:",userId); // DEBUG


  const identity = await Identity.findOne({
   user:userId
  });


  const user = await User.findById(userId);


  console.log("USER:",user);
  console.log("IDENTITY:",identity);


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

  res.status(500).json(err);

 }

};