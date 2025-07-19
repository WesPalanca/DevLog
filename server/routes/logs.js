import express from "express";
const router = express.Router();
import { fetchUserLogs, addUserLog, editUserLog, deleteUserLog, getSingleLog, updateLog } from "../controllers/logs.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/fetch", verifyToken, fetchUserLogs);
router.post("/add", verifyToken, addUserLog);
router.put("/edit/:id", verifyToken, editUserLog);
router.delete("/delete/:id", verifyToken, deleteUserLog);
router.put('/update/:id', verifyToken, updateLog);
router.get('/fetch/:id', verifyToken, getSingleLog);


export default router;