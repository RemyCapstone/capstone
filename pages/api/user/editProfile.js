import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const emailToFind = req.body[0];
  const { firstName, lastName, email } = req.body[1];

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
    const db = client.db();
    const usersCollection = db.collection("users");

    const data = await usersCollection.findOneAndUpdate({
      email: emailToFind
    }, {
      $set: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      }, 
    });
    client.close();

    if (!data) {
      return res.status(400).json( { message: "Unable to update", data: data })
    }
    return res.status(201).json({message: "Updated", data: data})
    
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      message: "Could not connect to the database.",
      type: "error",
    });
  }

}

export default handler; 