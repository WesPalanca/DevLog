import mongoose from "mongoose"

const logsSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    tech: {type: [String], default: [], required: false},
    time_spent: {type: Number, required: false},
}, {collection: "Logs", timestamps: true});

const Logs = mongoose.model("Logs", logsSchema);

export default Logs;