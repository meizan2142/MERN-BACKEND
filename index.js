const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
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
        // Collection
        const userCollection = client.db('Ecommerce').collection('newUser')
        // API ROUTES
        // User related
        app.get('/users', async (req, res) => {
            const result = await userCollection.find().toArray()
            res.send(result)
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const existingUser = await userCollection.findOne(query)
            if (existingUser) {
                return res.send({ message: 'User Already exists' })
            }
            const result = await userCollection.insertOne(user);
            res.send(result)
        });
    } finally {
    }
}
run().catch(console.dir);



// app
app.get('/', (req, res) => {
    res.send('The Final Run Assignment server is running')
})

// jwt 
app.post('/authentication', async(req, res) => {
    const userEmail = req.body
    const token = jwt.sign(userEmail, process.env.ACCESS_KEY_TOKEN, {
        expiresIn: "10d"
    });
    res.send({token})
})

app.listen(port, () => {
    console.log(`server is running on port, ${port}`);

})