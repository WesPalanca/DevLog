import Users from "../models/Users.js";

export const getUserData = async (req, res) => {
    console.log("GET request for details")
    try{
        const user_id = req.user.userId;
        const user = await Users.findById(user_id);
        if (!user){
            return res.status(404).json({success: false, message: "user not found"})
        }
        const userData = {
            username: user.username,
            email: user.email,
            bio: user.bio
        }

        return res.status(200).json({success: true, message: "successfully retrieved user details", userData});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Error: " + error.message})
    }
}

export const updateUserData = async(req, res) =>{
    console.log("updating user data");
    try{
        const user_id = req.user.userId;
        const newUserData = req.body;
        const user = await Users.findByIdAndUpdate(user_id, newUserData, {new: true});
        if (!user){
            return res.status(404).json({success: false, message: "could not find user"});
        };
        return res.status(200).json({success: true, message: "successfully updated user data"})

        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Error: " + error.message})
    }
}