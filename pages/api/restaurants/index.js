import clientPromise from "../../../lib/mongodb";
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

 async function handler (req, res) {
   try {
       const client = await clientPromise;
       const db = client.db("sample_restaurants");

       if (req.method === "GET") {

       const restaurants = await db
           .collection("restaurants")
           .find({})
           .sort({ cuisine: -1 })
           .limit(100)
           .toArray();

       res.json(restaurants);
       }

       
    //Post Req
    if (req.method === "POST") {
        let restId = req.body.restId;
        let empId = req.body.empId;
   
        try {
          const result = await db
          .collection("restaurants")
            .updateOne({_id: new ObjectId(restId) }, { $addToSet: { patrons: { patId: new ObjectId(empId) } } });
          res.json(result);
        } catch (error) {
          res.status(500).json({ message: "Adding Patron failed!" });
        }
      }
  
   } catch (e) {
       console.error(e);
   }
};

export default handler