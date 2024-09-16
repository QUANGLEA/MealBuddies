import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(
      String(process.env.MONGO_DB_CONNECTION_STRING)
    );
    return conn;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}
