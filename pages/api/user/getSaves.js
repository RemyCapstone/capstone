import { MongoClient, ObjectId } from "mongodb";

const getSavesHandler = async (req, res) => {
  const userid = req.body;

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
    const db = client.db();
    const usersCollection = db.collection("users");

    const userResult = await usersCollection.findOne({
      _id: ObjectId(userid),
    });
    console.log('userresult from get saves', userResult);

    // if user doesnt exist, close the db connection and return status of 404
    if (!userResult) {
      client.close();
      return res.status(404).json({ message:  "User not found."} );
    }

    if (userResult.savedProps !== undefined) {
      // Return data
      console.log("User has saved props: ", userResult.savedProps);

      client.close();
      return res.status(200).json({
        message: "User's saved properties retrieved!",
        savedProperties: userResult.savedProps
      });
    }
    else {
      client.close();
      return res.status(200).json({
        message: "Property saved!",
        savedProperties: null
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(502).json({ message: "Could not connect to the database."})
  }
}

export default getSavesHandler;