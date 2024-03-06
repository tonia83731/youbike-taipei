import { hashPassword } from "@/helpers/auth";
import { ConnectDatabase } from "@/helpers/db-util";
import bcrypt from "bcryptjs";

const SEED_USER = [
  {
    name: "Root",
    email: "root@example.com",
    password: "root_password",
  },
  {
    name: "Auth",
    email: "auth@example.com",
    password: "auth_password",
  },
];

export default async function handler(req, res) {
  let client;

  try {
    client = await ConnectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  try {
    const db = client.db();
    const User = db.collection("users");

    for (const user of SEED_USER) {
      const existUser = await User.findOne({ email: user.email });
      if (existUser) {
        res.status(422).json({
          message: "User already exist",
        });
        continue;
      }

      const hashedPassword = await hashPassword(user.password);
      await User.insertOne({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: "admin",
      });

      res.status(200).json({ message: "Created seed users success!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Created seed user failed!" });
    return;
  } finally {
    client.close();
  }
}
