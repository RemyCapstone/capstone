import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  const user = req.body
  // console.log("email:", user)
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
      
    const reviewsCollection = client.db("users").collection("reviews");
    const reviews = await reviewsCollection.find({
      email: user
    }).toArray();
    // console.log("Found reviews for this user:", reviews);
    client.close();
    return res.status(200).json({
      message: "Reviews found for this user.",
      reviews: reviews,
    })

  } catch (error) {
    console.log(error);
    return res.status(502).json({
      message: "Could not connect to the database.",
      type: "error",
      reviews: [],
    })
  }

};

export default handler;