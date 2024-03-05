import { MongoClient } from "mongodb";

export const ConnectDatabase = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_KEY);
  return client;
};

export const insertDocument = async (client, collectionName, document) => {
  const db = client.db();
  await db.collection(collectionName).insertOne(document);
};

export const deleteDocument = async (client, collectionName, document) => {
  const db = client.db();
  const result = await db.collection(collectionName).deleteOne(document);
  return result;
};

export const editDocument = async (
  client,
  collectionName,
  byObj,
  updateDoc
) => {
  const db = client.db();
  const result = await db
    .collection(collectionName)
    .replaceOne(byObj, updateDoc);
  return result;
};
