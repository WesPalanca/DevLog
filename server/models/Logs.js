import mongoose from "mongoose"

const logsSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    tech: {type: [String], required: false},
    time_spent: {type: Number, required: false},
    date: {type: Date, default: Date.now, required: true}
}, {collection: "Logs", timestamps: true});

const Logs = mongoose.model("Logs", logsSchema);

export default Logs;