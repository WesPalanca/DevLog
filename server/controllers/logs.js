import Logs from "../models/Logs.js";

// GET method
export const fetchUserLogs = async (req, res) =>{
    try{
        const userId = req.user.userId;
        const userLogs = await Logs.find({user_id: userId}).sort({date: -1});
        if (!userLogs.length){
            return res.status(404).json({success: false, message: "could not find any dev logs"});
        }
        return res.status(200).json({success: true, message: "successfully fetched user logs", userLogs});

    }
    catch(error){
        console.log("error getting user logs");
        return res.status(500).json({success: false, message: "User Log error: " + error.message})
    }
};

// POST method
export const addUserLog = async (req, res) =>{
    try{
        const userId = req.user.userId;
        const {title, description, tech, time_spent} = req.body;
        const newLog = new Logs({
            user_id: userId,
            title: title,
            description: description,
            tech: tech,
            time_spent: time_spent  
        });
        await newLog.save();
        return res.status(200).json({success: true, message: "successfully added user log"});
    }
    catch(error){
        console.log("adding user log error");
        return res.status(500).json({success: false, message: "User Log error: " + error.message});
    }
}

// PUT method
export const editUserLog = async (req, res) =>{
    try{
        const logId = req.params.id;
        const updateData = req.body;
        const updatedLog = await Logs.findByIdAndUpdate(logId, updateData, {new: true});
        if (!updatedLog){
            return res.status(404).json({success: false, message: "could not find log"});
        }
        return res.status(200).json({success: true, message: "successfully edited user log"});
    }
    catch(error){
        console.log("editing user log error");
        return res.status(500).json({success: false, message: "log edit error: " + error.message});
    }
}

// DELETE method
export const deleteUserLog = async (req, res) => {
    try{
        const logId = req.params.id;

        const deleteLog = await Logs.findByIdAndDelete(logId);
        if (!deleteLog){
            return res.status(404).json({success: false, message: "Log not found"});
        }
        return res.status(200).json({success: true, message: "deleted user log"});
    }
    catch(error){
        console.log("delete log error");
        return res.status(500).json({success: false, message: "dete log error: " + error.message});
    }
}