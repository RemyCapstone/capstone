import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
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
            password: passwordHash
        };
        const client = await MongoClient.connect('mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority');
        const db = client.db();

        const usersCollection = db.collection('users');
        const result = await usersCollection.insertOne(submitUserData);
        
        // create json web token to keep user signed in 
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })

        console.log('Result of inserting:', result);

        client.close();

        res.status(201).json({message: "User inserted!", result: result, token});
    }
}

export default handler;