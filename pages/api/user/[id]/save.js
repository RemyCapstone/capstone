import { MongoClient } from 'mongodb';

const saveHandler = async(req, res) => {
    const client = await MongoClient.connect('mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority');
    const db = client.db();
    const usersCollection = db.collection('users');
    const myReq = req.body;

    console.log("Save handler req.body: ", myReq);

    try {
        console.log("In try of save handler")
    }
    catch(error) {
        console.log("In catch of save handler")
        res.status(400).json({message: 'Failed to save listing.'});
    }
    client.close();
}

export default saveHandler;