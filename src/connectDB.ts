
import mongoose from "mongoose";
import database_configs from "./configs";

export default async function connectDb() {
  try {
    await mongoose.connect(database_configs)
    console.log('db connection successful')
  } catch (err) {
    console.log(`Error at connectDB function : `,  err)
    process.exit(1)
  }
}