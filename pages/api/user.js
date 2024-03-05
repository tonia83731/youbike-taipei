import { ConnectDatabase } from "@/helpers/db-util";
import bcrypt from 'bcryptjs'

const SEED_USER = [
    {
        name: 'Root',
        email: 'root@example.com',
        password: 'root_password'
    },
    {
        name: 'Auth',
        email: 'auth@example.com',
        password: 'auth_password'
    }
]

export default async function handler(req, res) {
    let client;

    try {
        client = await ConnectDatabase()
    } catch (error) {
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
    }

    try {
        const db = client.db()
        const userCollection = db.collection('users')

        for(const user of SEED_USER) {
            const existUser = await userCollection.findOne({email: user.email})
            if(existUser) {
                res.status(422).json({
                    message:
                    "The user is already exist",
                });
                continue;
            } 
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);

            await userCollection.insertOne({
                name: user.name,
                email: user.email,
                password: hash
            });

            res.status(200).json({ message: "Created seed users successfully!" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Created seed user failed!" });
        return;
    } finally {
        client.close();
    }
}