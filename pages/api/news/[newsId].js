import { ConnectDatabase } from "@/helpers/db-util"
import { ObjectId } from "bson";

export default async function handler(req, res) {
  const newsId = req.query.newsId
   let client;

   try {
     client = await ConnectDatabase();
   } catch (error) {
     res.status(500).json({ message: "Connecting to the database failed!" });
     return;
   }

   if (req.method === "GET") {
     try {
       const db = client.db();
       const documents = await db
         .collection("news")
         .find({ _id: new ObjectId(newsId) })
         .toArray();
       res.status(200).json({ news: documents });
     } catch (error) {
       res.status(500).json({ message: "Getting news by id failed." });
     }
   }
   client.close();
}