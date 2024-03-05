import { ConnectDatabase } from "@/helpers/db-util";

export default async function handler(req, res) {
  let client;

  try {
    client = await ConnectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email | (email.trim() === "") | !password | (password.trim() === "")) {
      res.status(422).json({ message: "Email and password cannot be blank!" });
      return;
    }
  }
}
