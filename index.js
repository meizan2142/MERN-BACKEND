const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000;


// Middlware
app.use(cors())
app.use(express.json())

// MongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.usv0l7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        client.connect();
        console.log('Database connected successfully');
    } finally {
    }
}
run().catch(console.dir);



// app
app.get('/', (req, res) => {
    res.send('The Final Run Assignment server is running')
})

app.listen(port, () => {
    console.log(`server is running on port, ${port}`);

})