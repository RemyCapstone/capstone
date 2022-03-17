import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const loginHandler = async(req, res) => {
  const client = await MongoClient.connect('mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority');

  const db = client.db();
  const secret = "test";

  const usersCollection = db.collection('users');

  const credentials = req.body;
  console.log("CREDENTIALLSSSSS hhhh")
  console.log(credentials.email, credentials.password);
  try {
    const existingUser = await usersCollection.findOne( {  email: credentials.email } );
    if(!existingUser) {
      console.log('here')

      client.close();
      return res
        .status(404)
        .json({
          message: "User with this email doesn't exist.",
          invalid: true,
        });

    }
    const isPasswordCorrect = await bcrypt.compare(credentials.password, existingUser.password);
    console.log("isPasswordCorrect", isPasswordCorrect);
    if(!isPasswordCorrect){
      console.log('here2')

      client.close();
      return res
        .status(400)
        .json({ message: "Invalid credentials.", invalid: true });
    }

    // create json web token to keep user signed in
    // const token = {};
    // const token = jwt.sign(
    //   { email: existingUser.email, id: existingUser._id },
    //   secret,
    //   { expiresIn: "1h" }
    // );
    res.status(200).json({message: "User logged in.", result: existingUser})
  } catch(error) {
    console.log('here3')

    res.status(400).json({message: 'User could not be logged in.', error: error});
  }

  client.close();
}

export default loginHandler;