import { ConnectDatabase, insertDocument } from "@/helpers/db-util";

export default async function handler(req, res) {
  let client;

  try {
    client = await ConnectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email } = req.body;
    if (!email | (email.trim() === "")) {
      res.status(422).json({ message: "Subscribe input cannot be blank!" });
      return;
    }
    if (!email.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    const newSubscribe = {
      email,
      createAt: new Date(),
    };

    try {
      await insertDocument(client, "subscribe", newSubscribe);
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting subscribe data failed!" });
      return;
    }
    res
      .status(200)
      .json({ message: "Added subscribe success!", subscribe: newSubscribe });
  }
  if (req.method === "GET") {
    const db = client.db();
    const doucments = await db
      .collection("subscribe")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ subscribe: doucments });
  }
}
