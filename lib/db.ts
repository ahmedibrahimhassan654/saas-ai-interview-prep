import mongoose from "mongoose";

const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI_LOCAL
    : process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Invalid/Missing environment variable: "MONGODB_URI_LOCAL" (development) or "MONGODB_URI" (production) in .env.local',
  );
}

const uri: string = MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
export { connectToDatabase };
