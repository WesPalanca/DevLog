import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    bio: {type: String, default: "[bio placeholder]"},
    github: {type: String},
    leetcode: {type: String}
}, {collection: "Users"})

const Users = mongoose.model("Users", userSchema);

export default Users