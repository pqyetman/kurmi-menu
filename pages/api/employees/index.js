import clientPromise from "../../../lib/mongodb";

 async function handler (req, res) {
   try {
       const client = await clientPromise;
       const db = client.db("sample_employees");

       const employees = await db
           .collection("employees")
           .find({})
           .sort({ name: -1 })
           .limit(10)
           .toArray();

       res.json(employees);
   } catch (e) {
       console.error(e);
   }
};

export default handler