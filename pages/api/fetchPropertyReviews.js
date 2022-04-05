// RETURNS ALL REVIEWS FROM A CERTAIN PROPERTY
import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  const property = req.body

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://remycapstone:NSpBNwJpvKxRko6T@cluster0.hwcwt.mongodb.net/users?retryWrites=true&w=majority"
    );
    const reviewsCollection = client.db("users").collection("reviews");

    const reviews = await reviewsCollection.aggregate([
      {
        $match: { "zpid" : property }
      },
      {
        $lookup:
        {
          from: 'users',
          localField: 'email',
          foreignField: 'email',
          as: 'user'
        }
      }
    ]).toArray()

    // console.log('these: ', reviews)
    // const existingReviews = await reviewsCollection.find({
    //   zpid: property,
    // }).toArray();

    // if (!existingReviews) {
    //   client.close();
    //   return res.status(200).json({
    //     message: "This property has no reviews.",
    //     reviews: [],
    //   })
    // }

    client.close();
    return res.status(200).json({
      message:  "Reviews found for this property.", 
      reviews: reviews,
    })

  } catch (error) {
    console.log(error);
    return res.status(502).json({
      message: "Could not connect to the database.",
      type: "error",
      reviews: [],
    });
  }
};

export default handler;