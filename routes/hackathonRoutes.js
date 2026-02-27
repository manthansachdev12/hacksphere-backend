import express from "express";

import {
 createHackathon,
 getMyHackathons,
 getHackathons
}
from "../controllers/hackathonController.js";

import { authMiddleware }
from "../middleware/authMiddleware.js";

const router = express.Router();


router.post(
 "/create",
 authMiddleware,
 createHackathon
);


router.get(
 "/myhackathons",
 authMiddleware,
 getMyHackathons
);


router.get(
 "/",
 getHackathons
);


export default router;