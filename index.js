const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app= express()
app.use(cors())
app.use(express())


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.p43vn94.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
      const jobCollection = client.db("jobPortal").collection("jobs")
      const jobCategory = client.db("jobPortal").collection("category")
      const jobLocations = client.db("jobPortal").collection("location")

      app.get('/category', async(req, res)=>{
         const result = await jobCategory.find().toArray()
         res.send(result)
         console.log(result)
      })

      app.get('/location', async(req, res)=>{
         const result = await jobLocations.find().toArray()
         res.send(result)
         console.log(result)
      })
      
      app.get('/all-jobs/:text', async(req, res)=>{
         const query = {status:req.params.text}
         const result = await jobCollection.find(query).toArray()
         res.send(result)
      })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   //  await client.close();
  }
}
run().catch(console.dir);








app.get('/', (req, res)=>{
   res.send("the job-portal is running")
})

app.listen(port, (req, res)=>{
   console.log(`the job-portal is running on the port ${port}`)
})