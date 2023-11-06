import clientPromise from "../../../lib/mongodb";
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;


async function handler(req, res) {
  //DB Connection with try catch and nested ifs for HTTTP Reqs
  try {
    const client = await clientPromise;
    const db = client.db("sample_employees");

    //Get Req

    if (req.method === "GET") {
      const employees = await db
        .collection("employees")
        .find({})
        .sort({ name: 1 })
        .limit(300)
        .toArray();

      res.json(employees);
    }

    //Post Req
    if (req.method === "POST") {
      let docVal = req.body;
      try {
        const result = await db
          .collection("employees")
          .insertOne(docVal);
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Inserting Employee failed!" });
      }
    }

    //Delete Req
    if (req.method === "DELETE") {
        let docVal = req.body.empId.toString();
      
      try {
        const result = await db
          .collection("employees")
          .deleteOne({_id: new ObjectId(docVal)});
        res.json(result);
      } catch (error) {
        res.status(202).json({ message: "Deleting Employee failed!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }
}

export default handler;
