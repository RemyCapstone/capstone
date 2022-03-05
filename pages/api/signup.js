import { MongoClient } from 'mongodb';

// api/signup
// POST api/signup

async function handler(req, res) {
    if (req.method === 'POST') {
        // contains: firstname, lastname, email, password (not encrypted)
        const newUserData = req.body;

        const client = await MongoClient.connect('mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority');
        const db = client.db();

        const usersCollection = db.collection('users');
        const result = await usersCollection.insertOne(newUserData);

        console.log('Result of inserting:', result);

        client.close();

        res.status(201).json({message: "User inserted!"});
    }
}

export default handler;