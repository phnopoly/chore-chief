import mongoose from "mongoose";

declare global {
   
  var __mongooseConn: Promise<typeof mongoose> | undefined;
}

export const connectMongo = async (uri: string) => {
  if (!global.__mongooseConn) {
    global.__mongooseConn = mongoose.connect(uri, { dbName: "chore-champ" });
  }
  return global.__mongooseConn;
};

export * from "zod";
