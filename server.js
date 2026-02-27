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

app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/applications",applicationRoutes);

app.use("/api/hackathons",hackathonRoutes);
app.use("/api/identity",identityRoutes);
app.use("/api/team",teamRoutes);



app.listen(5000,()=>{

 console.log("Server Running");

});