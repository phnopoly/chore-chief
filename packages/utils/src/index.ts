import mongoose, { type ConnectOptions as MongooseConnectOptions } from "mongoose";

declare global {
  var __mongooseConn: Promise<typeof mongoose> | undefined;
}

export const connectMongo = async (uri: string) => {
  if (!globalThis.__mongooseConn) {
    const opts: MongooseConnectOptions = { dbName: "chore-champ" };
    globalThis.__mongooseConn = mongoose.connect(uri, opts);
  }
  return globalThis.__mongooseConn;
};

export * from "zod";
