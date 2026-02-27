import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next)=>{

 try{

  let token = req.headers.authorization;

  if(!token){

   return res.status(401).json({
    message:"No token"
   });

  }

  if(token.startsWith("Bearer ")){

   token = token.split(" ")[1];

  }

  const decoded = jwt.verify(
   token,
   process.env.JWT_SECRET
  );

  // 🔥 CRITICAL FIX
  req.user = decoded.id;

  next();

 }catch(err){

  console.log("AUTH ERROR:",err);

  res.status(401).json({
   message:"Invalid token"
  });

 }

};


export default authMiddleware;