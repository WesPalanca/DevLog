import Goals from '../models/Goals.js';



// Get user's goals
export const getUserGoals = async (req, res) => {
  try{
      const userId = req.user.userId;
      const goals = await Goals.find({user_id: userId}).sort({createdAt: -1});
      if (!goals.length){
          console.log('could not find any goals')   
          return res.status(404).json({success: false, message: "could not find any goals"});
      }
      return res.status(200).json({success: true, message: "successfully fetched user goals", goals});

  }
  catch(error){
      console.log("error getting user goals");
      return res.status(500).json({success: false, message: "User Goal error: " + error.message})
    }
};





// Create goal
export const createGoal = async (req, res) => {
 try{
      const userId = req.user.userId;
      const {title, description, startDate, endDate} = req.body;

      const newGoal = new Goals({
          user_id: userId,
          title: title,
          description: description,
          startDate: startDate,
          endDate: endDate
      });      
      await newGoal.save();
      console.log(newGoal)
      return res.status(200).json({success: true, message: "successfully added user goal", goal: newGoal});
  }
  catch(error){
      console.log("adding user goal error");
      return res.status(500).json({success: false, message: "User Goal error: " + error.message});
  }
};


// Update progress / complete
export const updateUserGoal = async (req, res) => {
  const updateData = req.body;
  const goalId = req.params.id;
  try {
    const updated = await Goals.findByIdAndUpdate(
      goalId,
      { ...updateData },
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Could not find goal" });
    }

    return res.status(200).json(updated); // <-- Send the updated goal directly
  } catch (error) {
    console.error("Error updating goal:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete goal
export const deleteUserGoal = async (req, res) => {
  try{
      const goalId = req.params.id;

      const deleteGoal = await Goals.findByIdAndDelete(goalId);
      if (!deleteGoal){
          return res.status(404).json({success: false, message: "Goal not found"});
      }
      return res.status(200).json({success: true, message: "deleted user goal"});
  }
  catch(error){
      console.log("delete goal error");
      return res.status(500).json({success: false, message: "delete goal error: " + error.message});
  }
};


export const getRecentGoals = async (req, res) => {
  try{
    const userId = req.user.userId;
    const recentGoals = await Goals.find().sort({createdAt: -1}).limit(3)
    if (recentGoals.length === 0) {
      return res.status(204).json({ success: true, message: "No goals yet." });
    }
    return res.status(200).json({ success: true, message: "Recent goals fetched successfully", goals: recentGoals });
  }
  catch(error){
    console.log("error getting recent goals");
    return res.status(500).json({success: false, message: "Recent Goal error: " + error.message});
  }
}