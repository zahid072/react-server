const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("simple server is running..");
});

const uri = "mongodb+srv://jahidhasan19369:0urucSnU3UVs5HDT@cluster0.pvtbyiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
 
async function run() {
  
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const usersDB =  client.db("usersDB");
    const usersCollection = usersDB.collection("users");
 
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).send("Internal Server Error");
      } 
    }); 
 
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
   
}
run().catch(console.dir);

app.listen(port, (req, res) => {
  console.log(`simple server is running on port: ${port}`);
});
