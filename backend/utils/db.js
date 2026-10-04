import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
dotenv.config();

// Prevent querySrv ESERVFAIL on Windows DNS lookups with MongoDB Atlas
try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
    // ignore if environment restricts setting dns servers
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log('mongodb connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
export default connectDB;