// RETURNS ALL REVIEWS FROM A CERTAIN PROPERTY
import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  const property = req.body

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
    const reviewsCollection = client.db("properties").collection("reviews");

    const existingReview = await reviewsCollection.find({
      zpid: property,
    });

    // DOES NOTHING YET 
    // FINDING GETS THE FIRST 20 REVIEWS, HOW TO ITERATE?
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      message: "Could not connect to the database.",
      type: "error",
    });
  }
};

export default handler;