import { ConnectDatabase, insertDocument } from "@/helpers/db-util";
import dayjs from "dayjs";

export default async function handler(req, res) {
  let client;

  // connect database
  try {
    client = await ConnectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { title, subtitle, description, image, startDate, endDate } =
      req.body;

    if (
      !title |
      (title.trim() === "") |
      !subtitle |
      (subtitle.trim() === "") |
      !description |
      (description.trim() === "") |
      !startDate |
      !endDate
    ) {
      res.status(422).json({
        message:
          "Title, subtitle, description, startDate and endDate cannot be blank!",
      });
      return;
    }

    const newNews = {
      title,
      subtitle,
      description,
      image,
      startDate,
      endDate,
      updateAt: new Date(),
    };

    // insert data
    try {
      await insertDocument(client, "news", newNews);
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting news data failed!" });
      return;
    }

    res.status(200).json({ message: "Add news success!", news: newNews });
  }
  if (req.method === "GET") {
    const db = client.db();
    const doucments = await db
      .collection("news")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ news: doucments });
  }
  client.close();
}
