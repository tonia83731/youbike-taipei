import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  console.log(req.query);
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_KEY);
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
    const db = client.db();
    await db.collection("comments").insertOne({ newComment });

    
    res.status(200).json({ message: "Added comment!", comment: newComment });
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
  client.close();
}
