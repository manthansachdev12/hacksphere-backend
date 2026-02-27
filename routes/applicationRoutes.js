import express from "express";

import {
 applyHackathon,
 getApplications,
 getMyApplications
}
from "../controllers/applicationController.js";

import { authMiddleware }
from "../middleware/authMiddleware.js";

const router = express.Router();


router.get(
 "/my",
 authMiddleware,
 getMyApplications
);


router.get(
 "/:id",
 authMiddleware,
 getApplications
);


router.post(
 "/apply/:id",
 authMiddleware,
 applyHackathon
);


export default router;