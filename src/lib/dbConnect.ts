import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Database already connected");

    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");

  } catch (error) {
    if (error instanceof Error) {
      console.error("Database connection failed:", error);
    console.error(error.stack);
    process.exit(1);
    }
  }
};

const dbDisconnect = async (): Promise<void> => {
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = undefined;
    console.log("Database disconnected");
  }
};

export { dbConnect, dbDisconnect };
