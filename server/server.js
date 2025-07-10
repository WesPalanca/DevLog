import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from "./routes/auth.js";
import logRoutes from "./routes/logs.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    dbName: "DevLog"
}).then(console.log("Connected to MongoDB"))
.catch((error) => console.log("error connecting to database: " + error));

app.use("/api/user", userRoutes);
app.use("/api/logs", logRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});