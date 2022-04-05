import { MongoClient, ObjectId } from "mongodb";

/* Return saved status of a property for a user by zpid and userid */
const getPropertyStatusHandler = async (req, res) => {
  const zpid = req.body[0];
  const email = req.body[1];
  console.log('in api', zpid, email)

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
    const db = client.db();
    const usersCollection = db.collection("users");

    // Get the user object we're dealing with
    const user = await usersCollection.findOne({
      email: email
    });
    console.log('User result from /api/user/getPropertyStatus.js: ', user);

    // if user doesnt exist, close the db connection and return status of 404
    if (!user) {
      client.close();
      return res.status(404).json({
        message:  "User not found.",
        savedStatus: false
      });
    }

    else {
      // Take care of edge cases
      if (user.savedProps == undefined || user.savedProps.length <= 0) {
        client.close();
        return res.status(200).json ({
          message: "User has not saved this property.",
          savedStatus: false
        });
      }

      for (let i = 0; i < user.savedProps.length; i++) {
        console.log(user.savedProps[i].zpid);
        if (user.savedProps[i].zpid == zpid) {
          client.close();
          return res.status(200).json ({
            message: "User has saved this property.",
            savedStatus: true
          });
        }
      }
      client.close();
      return res.status(200).json ({
        message: "User has not saved this property.",
        savedStatus: false
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(502).json({ message: "Could not connect to the database."})
  }
}

export default getPropertyStatusHandler;