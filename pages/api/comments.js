export default async function handler(req, res) {
  console.log(req.query);
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

    // console.log(name, phone, email, text);
    const newComment = {
      id: new Date().toISOString,
      name,
      phone,
      email,
      text,
    };
    console.log(newComment);
    res.status(200).json({ message: "Added comment!", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "John Doe",
        phone: "123-456-7890",
        email: "john@example.com",
        comment: "Nice person",
      },
      {
        id: "c2",
        name: "Jane Smith",
        phone: "987-654-3210",
        email: "jane@example.com",
        comment: "Great service",
      },
    ];

    res.status(200).json({ comments: dummyList });
  }
}
