import mongoose from "mongoose";

const cached = (global as any).mongoose || { conn: null, promise: null };

const MONGODB_URI = process.env.MONGODB_URI;
export const connectToDB = async () => {
  try {
    if (cached.conn) return cached.conn;
    cached.promise =
      cached.promise ||
      (MONGODB_URI ? mongoose.connect(MONGODB_URI) : undefined);

    cached.conn = await cached.promise;

    return cached.conn;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot connect to DB" + error);
  }
};
