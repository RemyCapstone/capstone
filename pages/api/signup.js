import { MongoClient } from 'mongodb';

// api/signup
// POST api/signup
async function handler(req, res) {
    if (req.method === 'POST') {
        // contains: firstname, lastname, email, password
        const newUserData = req.body;

        const bcrypt = require ('bcrypt');
        const saltRounds = 10;
        const passwordHash = bcrypt.hashSync(newUserData.password, saltRounds);

        const submitUserData = {
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            email: newUserData.email,
            password: passwordHash,
            savedProps: [],

        };
        console.log(submitUserData);

        const client = await MongoClient.connect('mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority');
        const db = client.db();

        const usersCollection = db.collection('users');
        const emailResult = await usersCollection.findOne({
            email: submitUserData.email
        })

        if (emailResult)
        {
            res.status(401).json({
                status: 401,
                message: "Email already exists."
            });
            client.close();
            return;
        }

        const result = await usersCollection.insertOne(submitUserData);
        client.close();
        res.status(201).json({
            status: 201,
            message:"User inserted!"
        });
    }
}

export default handler;