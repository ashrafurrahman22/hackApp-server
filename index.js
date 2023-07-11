const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { urlencoded } = require('express');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors())
app.use(express.json());
// app.use(urlencoded({ extended: true }));
app.use(urlencoded({extended:true}));



// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hma3xtv.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0pjjifd.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run(){
    try {
        await client.connect();
        const myCollection = client.db('hackDB').collection('users');

        // my api
        app.get('/user', async(req, res)=>{
            const query = {};
            const cursor  = myCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

         // catch single item
         app.get('/user/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const food = await myCollection.findOne(query);
            res.send(food);
        });

         // post API
         app.post('/user', async(req, res)=>{
            const purchase = req.body;
            const result = await myCollection.insertOne(purchase);
            res.send(result);
        });

}

    finally {
                }
            }
            run().catch(console.dir);

// root
app.get('/', (req, res)=>{
    res.send('hackDB server is running')
});

// root listen
app.listen(port, ()=>{
    console.log('hackDB Server is running on port', port);
})