import clientPromise from "../../../lib/mongodb";

 async function handler (req, res) {
   try {
       const client = await clientPromise;
       const db = client.db("sample_restaurants");

       const restaurants = await db
           .collection("restaurants")
           .find({})
           .sort({ cuisine: -1 })
           .limit(10)
           .toArray();

       res.json(restaurants);
   } catch (e) {
       console.error(e);
   }
};

export default handler