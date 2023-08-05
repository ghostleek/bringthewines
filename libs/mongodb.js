import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error){
        console.log('Error while trying to connect to MongoDB:', error);
    }
};

export default connectMongoDB;
