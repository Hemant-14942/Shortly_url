import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Assuming the MONGO_URI is set correctly in your environment variables
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/urlshortly`)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};
