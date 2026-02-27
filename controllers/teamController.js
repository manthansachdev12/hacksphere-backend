import User from "../models/User.js";
import Identity from "../models/Identity.js";
import Invitation from "../models/Invitation.js";
import nodemailer from "nodemailer";


// ================= SEARCH USERS =================

export const searchUsers = async (req, res) => {

 try {

  const skill = req.query.skills;

  // Empty search → return nothing
  if (!skill || skill.trim() === "") {
   return res.json([]);
  }

  // Get identities
  const identities = await Identity.find();

  // Filter identities by skill
  const matched = identities.filter(identity => {

   if (!identity.skills) return false;

   return identity.skills
    .toLowerCase()
    .includes(skill.toLowerCase());

  });


  // Extract user IDs
  const userIds = matched.map(i => i.user);


  // Fetch users
  const users = await User.find({
   _id: { $in: userIds }
  }).select("-password");


  // Attach skills to user
  const result = users.map(user => {

   const identity = matched.find(i =>
    i.user.toString() === user._id.toString()
   );

   return {
    _id: user._id,
    name: user.name,
    email: user.email,
    skills: identity.skills.split(",").map(s => s.trim())
   };

  });


  res.json(result);

 } catch (error) {

  console.log("TEAM SEARCH ERROR:", error);

  res.status(500).json({
   message: "Search Failed"
  });

 }

};



// ================= SEND INVITE =================



export const sendInvite = async (req,res)=>{

 try{

  const senderId =
   req.user?.id ||
   req.user?._id ||
   req.user?.userId;

  const { receiverId } = req.body;


  // Save invitation
  await Invitation.create({
   senderId,
   receiverId
  });


  // Fetch users
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);


  console.log("SENDER:",sender.email);
  console.log("RECEIVER:",receiver.email);


  // Gmail transporter
  const transporter = nodemailer.createTransport({

   service:"gmail",

   auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD
   }

  });


  await transporter.sendMail({

   from:process.env.EMAIL,

   to:receiver.email,

   subject:"HackSphere Team Invitation",

   html:`

   <h2>Team Invitation</h2>

   <p>${sender.name} invited you to join a team.</p>

   <p>Login and accept invitation.</p>

   <a href="http://localhost:5173/team">
   Open Team Page
   </a>

   `

  });


  console.log("EMAIL SENT SUCCESSFULLY");


  res.json({
   message:"Invite Sent + Email Delivered"
  });


 }catch(err){

  console.log("EMAIL ERROR:",err);

  res.status(500).json(err);

 }

};


// ================= GET INVITES =================

export const getInvites=async(req,res)=>{

 try{

 const invites=await Invitation.find({

  receiverId:req.user.id,
  status:"pending"

 }).populate("senderId","name email");


 res.json(invites);


 }catch(err){

 console.log("GET INVITES ERROR:",err);

 res.status(500).json(err);

 }

};




// ================= ACCEPT INVITE =================

export const acceptInvite=async(req,res)=>{

 try{

 const inviteId=req.params.id;

 const invite=await Invitation.findById(inviteId);


 invite.status="accepted";

 await invite.save();


 const sender=await User.findById(invite.senderId);
 const receiver=await User.findById(invite.receiverId);

  sender.teamMembers = sender.teamMembers || [];
 receiver.teamMembers = receiver.teamMembers || [];


 sender.teamMembers.push(receiver._id);
 receiver.teamMembers.push(sender._id);


 sender.lookingForTeam=false;
 receiver.lookingForTeam=false;


 await sender.save();
 await receiver.save();


 res.json({message:"Joined Team"});


 }catch(err){

 console.log("ACCEPT ERROR:",err);

 res.status(500).json(err);

 }

};




// ================= REJECT INVITE =================

export const rejectInvite=async(req,res)=>{

 try{

 const inviteId=req.params.id;

 const invite=await Invitation.findById(inviteId);

 invite.status="rejected";

 await invite.save();


 res.json({message:"Rejected"});


 }catch(err){

 console.log("REJECT ERROR:",err);

 res.status(500).json(err);

 }

};