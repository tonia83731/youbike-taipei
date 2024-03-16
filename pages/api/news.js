import {
  ConnectDatabase,
  insertDocument,
  deleteDocument,
  editDocument,
} from "@/helpers/db-util";
import { ObjectId } from "bson";

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
    const {
      title,
      subtitle,
      description,
      image,
      imageName,
      startDate,
      endDate,
    } = req.body;

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
      imageName,
      startDate,
      endDate,
      updateAt: new Date(),
    };

    // insert data
    try {
      await insertDocument(client, "news", newNews);
      // client.close();
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
  if (req.method === "PUT") {
    const {
      _id,
      title,
      subtitle,
      description,
      image,
      imageName,
      startDate,
      endDate,
    } = req.body;
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

    const updateNews = {
      title,
      subtitle,
      description,
      image,
      imageName,
      startDate,
      endDate,
      updateAt: new Date(),
    };

    // update data
    try {
      if (_id) {
        await editDocument(
          client,
          "news",
          { _id: new ObjectId(_id) },
          updateNews
        );
        // const db = client.db();
        // if (_id) {
        //   await db
        //     .collection("news")
        //     .replaceOne({ _id: new ObjectId(_id) }, updateNews);
      } else {
        res.status(404).json({
          message: "_id no found!",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Updating news data failed!" });
      return;
    }

    res.status(200).json({ message: "Update news success!", news: updateNews });
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      res.status(422).json({ message: "Cannot find news!" });
      return;
    }

    try {
      const result = await deleteDocument(client, "news", {
        _id: new ObjectId(id),
      });
      //  const db = client.db();
      //  const result = await db
      //    .collection("news")
      //    .deleteOne({ _id: new ObjectId(id) });
      const { deletedCount } = result;
      if (deletedCount === 0) {
        res
          .status(422)
          .json({ message: "Delete news data failed! [deletedCount: 0]" });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Delete news data failed!" });
      return;
    }

    res.status(200).json({ message: "Delete news success!", _id: id });
  }
  client.close();
}
