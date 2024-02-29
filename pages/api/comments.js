import { ConnectDatabase, insertDocument } from "@/helpers/db-util";
import { ObjectId } from "bson";


export default async function handler(req, res) {
  // console.log(req.query);
  let client;
  // connect database
  try {
    client = await ConnectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }
  if (req.method === "POST") {
    const { name, phone, email, text } = req.body;
    // check validation
    if (
      !name |
      (name.trim() === "") |
      !email |
      (email.trim() === "") |
      !text |
      (text.trim() === "")
    ) {
      res
        .status(422)
        .json({ message: "Name, email and text cannot be blank!" });
      return;
    }
    if (!email.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    const newComment = {
      name,
      phone,
      email,
      text,
    };

    // insert data
    try {
      await insertDocument(client, "comments", newComment);
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting comment data failed!" });
      return;
    }

    res
      .status(200)
      .json({ message: "Added comment success!", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    // console.log(id)
    if (!id) {
      res.status(422).json({ message: "Cannot find comment!" });
      return;
    }

    try {
      // console.log(client)
      const db = client.db();
      const result = await db
        .collection("comments")
        .deleteOne({ _id: new ObjectId(id) });
      const { deletedCount } = result;
      if (deletedCount === 0) {
        res.status(422).json({ message: "Delete comment data failed! [deletedCount: 0]" });
        return;
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Delete comment data failed!" });
      return;
    }
    res.status(200).json({ message: "Delete comment success!", _id: id });
  }
  client.close();
}
