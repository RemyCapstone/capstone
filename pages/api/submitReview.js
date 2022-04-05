import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  const newReview = req.body;

  console.log("review?:", newReview)

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
    const reviewsCollection = client.db("users").collection('reviews'); 


    const existingReview = await reviewsCollection.findOne({
      email: newReview.email,
      zpid: newReview.zpid,
    });

    if (existingReview) {
      client.close();
      return res.status(409).json({
        message: "User has already posted a review for this property."
      })
    }

    const result = await reviewsCollection.insertOne(newReview);
    console.log('Inserted:', result);
    client.close();
    res.status(201).json({
      status: 201,
      message: "Review added."
    })
    
  } catch (error) {
    console.log(error)
    return res.status(502).json({
      message: "Could not connect to the database.",
      type: "error"
    })
  }
}

export default handler;