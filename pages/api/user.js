// Because user data can update due to events across the site, such as saving a property or changing their name, the site needs to pull the user's information from the updated database. As of now, the information is stored in the session via next auth. But what happens when it's updated? The session information becomes outdated.
import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  const userid = req.body;

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
    const db = client.db();
    const usersCollection = db.collection("users");
    const result = await usersCollection.findOne({
      _id: ObjectId(userid),
    });
    
    if (!result) {
      client.close();
      return res.status(404).json({ message: "User not found.", user: null })
    }
    client.close();
    return res.status(200).json({ message: "User found.", user: result })

  } catch (error) {
    console.log(error)
    return res.status(502).json({ message: "Couldn't get the user." })
  }

};

export default handler;