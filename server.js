import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js";
import identityRoutes from "./routes/identityRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

dotenv.config();

const app=express();



app.use(express.json());



app.use(cors({
 origin:[
   "http://localhost:5173",
   "https://hacksphere-one.vercel.app"
 ],
 credentials:true
}));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/identity", identityRoutes);
app.use("/api/team", teamRoutes);

app.listen(5000, () => {
  console.log("Server Running");
});
