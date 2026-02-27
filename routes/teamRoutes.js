import express from "express";

import {

 searchUsers,
 sendInvite,
 getInvites,
 acceptInvite,
 rejectInvite

} from "../controllers/teamController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();



router.get("/search",authMiddleware,searchUsers);

router.post("/invite",authMiddleware,sendInvite);

router.get("/invites",authMiddleware,getInvites);

router.post("/accept/:id",authMiddleware,acceptInvite);

router.post("/reject/:id",authMiddleware,rejectInvite);



export default router;