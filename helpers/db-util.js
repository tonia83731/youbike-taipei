import { MongoClient } from "mongodb";

export const ConnectDatabase = async () => {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_KEY);
  return client;
};

export const insertDocument = async (client, collectionName, document) => {
  const db = client.db();
  await db.collection(collectionName).insertOne(document);
};
