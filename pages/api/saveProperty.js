import { MongoClient, ObjectId } from "mongodb";

// var ObjectId = require("mongodb").ObjectId;

const handler = async (req, res) => {
  const property = req.body[0];
  const user = req.body[1];

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
    const db = client.db();
    const usersCollection = db.collection("users");

    const userResult = await usersCollection.findOne({
      _id: ObjectId(user._id),
    });
    console.log('userresult', userResult);


    // if user doesnt exist, close the db connection and return status of 404
    if (!userResult) {
      client.close();
      return res.status(404).json({ message:  "User not found."} );
    }

    console.log(userResult.savedProps)
    if (userResult.savedProps !== undefined && userResult.savedProps.find( (e) => e.zpid === property.zpid )) {
      // Handle unsave
      console.log("Found one.")
      await usersCollection.updateOne(
        { _id: ObjectId(user._id) },
        {
          $pullAll: {
            savedProps: [property]
          }
        }
      );
      client.close();
      return res.status(200).json({ message: "Property unsaved!" });
    }
    else {
      console.log('HERERERERERERER')
      await usersCollection.updateOne(
        { _id: ObjectId(user._id) },
        {
          $push: {
            savedProps: {
              $each: [property],
              $position: 0,
            },
          },
        }
      );
      client.close();
      return res.status(200).json({ message: "Property saved!" });
    }
    // console.log(result ? result : null)

  } catch (error) {
    console.log(error);
    return res.status(502).json({ message: "Could not connect to the database."})
  }

}

export default handler;