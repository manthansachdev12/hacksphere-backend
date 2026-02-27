import express from "express";

import {
 saveIdentity,
 checkIdentity,
 getProfile
} from "../controllers/identityController.js";

import { authMiddleware }
from "../middleware/authMiddleware.js";

const router = express.Router();


// Save identity
router.post(
 "/save",
 authMiddleware,
 saveIdentity
);


// Check identity
router.get(
 "/check",
 authMiddleware,
 checkIdentity
);


// Get Profile
router.get(
 "/profile",
 authMiddleware,
 getProfile
);


export default router;