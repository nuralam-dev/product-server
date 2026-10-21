// 1st
import cors from "cors";
import express from "express";
// dots env
import "dotenv/config";
const app = express();
const PORT = 4000;
// 4th
import { MongoClient } from "mongodb";
// call connectToMongoDB
connectToMongoDB();
app.use(cors());
app.use(express.json());
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("product-db");
const productCollection = db.collection("product");

// 5th post method
app.post("/product", async (req, res) => {
  const data = req.body;
  const result = await productCollection.insertOne(data);
  console.log(result);

  res.send(result);
});
// frontend
app.get("/product", async (req, res) => {
  const result = await productCollection.find({}).toArray();
  res.send(result);
});
// 3rd
app.get("/", (req, res) => {
  res.send("hello World");
});

// 2nd Start the server
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
