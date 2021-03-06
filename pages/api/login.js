import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
const loginHandler = async(req, res) => {
  const client = await MongoClient.connect('mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority');

  const db = client.db();

  const usersCollection = db.collection('users');

  const credentials = req.body;

  try {
    const existingUser = await usersCollection.findOne( { email: credentials.email } );

    if(!existingUser) {
      client.close();
      return res
        .status(404)
        .json({
          message: "User with this email doesn't exist.",
          invalid: true,
        });
    }
    const isPasswordCorrect = await bcrypt.compare(credentials.password, existingUser.password);

    if(!isPasswordCorrect){
      client.close();
      return res
        .status(400)
        .json({ message: "Invalid credentials.", invalid: true });
    }
    res.status(200).json({message: "User logged in.", result: existingUser})
  } catch(error) {

    res.status(400).json({message: 'User could not be logged in.', error: error});
  }

  client.close();
}

export default loginHandler;