// routes/goals.js
import express from 'express';

import { createGoal, getUserGoals, updateUserGoal, deleteUserGoal, getRecentGoals } from '../controllers/goals.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
// Create goal
router.post('/create', verifyToken, createGoal);

// Get user's goals
router.get('/fetch', verifyToken, getUserGoals);

// Update progress / complete
router.put('/update/:id', verifyToken, updateUserGoal);

// Delete goal
router.delete('/delete/:id', verifyToken, deleteUserGoal);

router.get('/fetch/recent', verifyToken, getRecentGoals);
export default router;
