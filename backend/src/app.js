const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const mainRoute = require('./routes/main')
const productsRoute = require("./routes/products")
const initialMarketData = require('./scripts/initialMarketData.js');
const myScript = require('./scripts/getMarketData');

const loginRoutes =  require("./routes/authentication")

const getProducts = require('./dataAccess/getProducts');
const addReview = require('./dataAccess/addReview');
const addProducts = require('./dataAccess/addProducts');
const addBid = require('./dataAccess/addBid');
const bidProcess = require('./dataAccess/bidProcess');

const prisma = require('./config/prismaConfig.js');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(mainRoute)
app.use(loginRoutes)
// app.use(productsRoute)

app.use(cors())

app.get('/products', async (req, res) =>{
    const products = await getProducts(req, res);
    res.json(products);
} )

let marketData = [];

app.get('/health',(req,res)=>{
    res.json({
        status : "running",
    })
})

app.post('/addProducts',(req,res)=>{
    addProducts(req,res)
})

app.post('/addReview',(req,res)=>{
    addReview(req,res)
})

app.post('/addBid',(req,res)=>{
    addBid(req,res)
})

app.get('/getLatestMarketData', (req, res) => {
    res.json(marketData);
});

app.post('/bidProcess', async (req, res) => {
    console.log("here");
    console.log(req.body);
    await bidProcess(req, res);
});

setInterval(() => {
    marketData = myScript();
}, 24 * 60 * 60 * 1000);

app.listen(8087, async () => {
    console.log(`running on http://localhost:${8087}`);
    marketData = initialMarketData;
})