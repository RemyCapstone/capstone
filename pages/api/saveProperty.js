import { MongoClient } from "mongodb";

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
      email: user.email
    });
    console.log('User',user);

    if (!userResult) { // Google provider account
      // client.close();
      // return res.status(404).json({
      //   message:  "User not found.",
      //   type: "error"
      // } );

      let submitUserData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        savedProps: [property],
      };
      await usersCollection.insertOne(submitUserData);
      client.close();
      console.log("saved")
      return res.status(200).json({
        message:"Property saved!",
        type: "success"
      })
    }

    if (userResult.savedProps && userResult.savedProps.find( (e) => e.zpid === property.zpid )) {
      await usersCollection.updateOne(
        { email: user.email },
        {
          $pullAll: {
            savedProps: [property]
          }
        }
      );
      client.close();
      console.log("unsaved")
      return res.status(200).json({ message: "Property unsaved!", type: "success" });
    }
    else {
      await usersCollection.updateOne(
        { email: user.email },
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
      console.log("saved")
      return res.status(200).json({ message: "Property saved!", type: "success" });
    }

    // console.log(result ? result : null)

  } catch (error) {
    console.log(error);
    return res.status(502).json({
      message: "Could not connect to the database.",
      type: "error"
    })
  }

}

export default handler;