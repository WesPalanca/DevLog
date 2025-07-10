import express from "express";
const router = express.Router();
import { fetchUserLogs, addUserLog, editUserLog, deleteUserLog } from "../controllers/logs.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/fetch", verifyToken, fetchUserLogs);
router.post("/add", verifyToken, addUserLog);
router.put("/edit/:id", verifyToken, editUserLog);
router.delete("/delete/:id", verifyToken, deleteUserLog)


export default router;