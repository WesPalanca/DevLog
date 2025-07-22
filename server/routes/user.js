import express from 'express';
const router = express.Router();
import { getUserData, updateUserData } from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';


router.get("/details", verifyToken, getUserData);
router.put("/update", verifyToken, updateUserData);


export default router;