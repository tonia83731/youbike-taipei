import { ConnectDatabase } from "@/helpers/db-util";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  let client;
  try {
    client = await ConnectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }
   if (req.method === "DELETE") {
    //  const { commentId } = req.body;
     // console.log(typeof commentId)
     const { id } = req.query;

     if (!id) {
       res.status(422).json({ message: "Cannot find comment!" });
       return;
     }

     try {
       // console.log(client)
       const db = client.db();
       const result = await db
         .collection("comments")
         .deleteOne({ _id: id });
       const { deletedCount } = result;
       if (deletedCount === 0) {
         res.status(422).json({ message: "Comment not found!" });
         return;
       }
     } catch (error) {
       res.status(500).json({ message: "Delete comment data failed!" });
       return;
     }
     res
       .status(200)
       .json({ message: "Delete comment success!", _id: id });
   }
}