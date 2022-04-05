// LOOKS FOR A SPECIFIC USER'S REVIEW 
// RETURNS THE USER'S REVIEW AS PAYLOAD 

// ACCEPTS USER ID and PROPERTY ID
import { MongoClient, ObjectId } from "mongodb";

const handler = async(req, res) => {
  // console.log('request: ', req.body);
  const target = {
    zpid: req.body[0],
    userid: req.body[1],
  };

  console.log(target)
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
    const reviewsCollection = client.db("users").collection("reviews");

    const existingReview = await reviewsCollection.findOne({
      userid: ObjectId(target.userid),
      zpid: target.zpid,
    });
    
    client.close();

    if(!existingReview){
      return res.status(204).json({
        message: "User does not have a review for this property.",
        review: {}
      })
    }
    // console.log('existing user review:', existingReview)
    return res.status(200).json({
      message: "Review for this user and property found.",
      review: existingReview,
    })
    
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      message: "Could not connect to the database.",
      type: "error",
      review: {},
    });
  }
}

export default handler;