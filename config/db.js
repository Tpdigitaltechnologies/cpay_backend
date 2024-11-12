import mongoose from "mongoose";

export const connectDB = async() =>{
    const dbURL = process.env.MONGO_URI || "";
    try {
        const { connection } = await mongoose.connect(dbURL);
        console.log(`MongoDB is connected with ${connection.host}`);

    } catch (error) {
        console.log(error);
        setTimeout(connectDB, 5000);
    }
}