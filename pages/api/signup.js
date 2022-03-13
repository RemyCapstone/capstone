import { MongoClient } from 'mongodb';

// api/signup
// POST api/signup
async function handler(req, res) {
    if (req.method === 'POST') {
        // contains: firstname, lastname, email, password
        console.log("I AM HERE");
        const newUserData = req.body;

        const bcrypt = require ('bcrypt');
        const saltRounds = 10;
        const passwordHash = bcrypt.hashSync(newUserData.password, saltRounds);

        const submitUserData = {
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            email: newUserData.email,
            password: passwordHash
        };

        const client = await MongoClient.connect('mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority');
        const db = client.db();

        const usersCollection = db.collection('users');
        const emailResult = await usersCollection.findOne({
            email: submitUserData.email
        })

        if (emailResult)
        {
            res.status(401).json({message: 401});
            client.close();
            return;
        }

        const result = await usersCollection.insertOne(submitUserData);
        console.log('Result of inserting:', result);
        client.close();
        res.status(201).json({message: 201});
    }
}

export default handler;