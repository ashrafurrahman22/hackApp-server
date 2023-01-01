const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors())
app.use(express.json());



// const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hma3xtv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try {
        await client.connect();
        const myCollection = client.db('hackDB').collection('users');

        // my api
        app.get('/data', async(req, res)=>{
            const query = {};
            const cursor  = myCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

         // catch single item
         app.get('/data/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const food = await myCollection.findOne(query);
            res.send(food);
        });

         // post API
         app.post('/data', async(req, res)=>{
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