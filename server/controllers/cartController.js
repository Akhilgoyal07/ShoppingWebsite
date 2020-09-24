var mongoClient=require("mongodb").MongoClient;

// var mongodbUrl = "mongodb://localhost:27017/";
var mongodbUrl = "mongodb+srv://akhil:Akhil@07@cluster0.jn8qz.mongodb.net/smartShopDb?retryWrites=true&w=majority";

function addProduct (req, res)
{
    mongoClient.connect(mongodbUrl, (err, dbHost)=>{
        if(err)
        {
            res.status(500);
            res.json({message: "Not able to connect to the server"});
        }
        else
        {
            var db = dbHost.db("smartShopDb");
            db.collection("cart", (err, collection)=>{
                if(err)
                {
                    res.status(500);
                    res.json({message: "Not able to connect to the collection"});
                }
                else
                {
                    var productToBeInserted = req.body;
                    collection.insertOne({userId: productToBeInserted.userId, url:productToBeInserted.url, price:productToBeInserted.price},
                    (err, result)=>{
                        if(err)
                        {
                            res.status(500);
                            res.json({message:err});
                        }
                        else
                        {
                            // console.log(result);
                            res.status(200);
                            res.json({message:true});
                        }
                    })
                }
            })
        }
    })
}

function getProduct(req, res)
{
    mongoClient.connect(mongodbUrl, (err, dbHost)=>{
        if(err)
        {
            res.status(500);
            res.json({message: "Not able to connect to the server"});
        }
        else
        {
            var db = dbHost.db("smartShopDb");
            db.collection("cart", (err, collection)=>{
                if(err)
                {
                    res.status(500);
                    res.json({message: "Not able to connect to the collection"});
                }
                else
                {
                    var obj = req.body;
                    collection.find({userId:obj.userId}).toArray((err, result)=>{
                        if(err)
                        {
                            res.status(500);
                            res.json({message:"Error connecting to the mongodb server"});
                        }
                        else
                        {
                            // console.log("cart product : ", result);
                            res.json({message:true, cartProducts:result});
                        }
                     })
                }
            })
        }
    })
}

function removeProduct (req, res)
{
    mongoClient.connect(mongodbUrl, (err, dbHost)=>{
        if(err)
        {
            res.status(500);
            res.json({message: "Not able to connect to the server"});
        }
        else
        {
            var db = dbHost.db("smartShopDb");
            db.collection("cart", (err, collection)=>{
                if(err)
                {
                    res.status(500);
                    res.json({message: "Not able to connect to the collection"});
                }
                else
                {
                    var product = req.body;
                    collection.deleteOne({userId: product.userId, url:product.url, price:product.price},
                    (err, result)=>{
                        if(err)
                        {
                            res.status(500);
                            res.json({message:err});
                        }
                        else
                        {
                            // console.log(result);
                            res.status(200);
                            res.json({message:true});
                        }
                    })
                }
            })
        }
    });
}

function removeAllProduct (req, res)
{
    mongoClient.connect(mongodbUrl, (err, dbHost)=>{
        if(err)
        {
            res.status(500);
            res.json({message: "Not able to connect to the server"});
        }
        else
        {
            var db = dbHost.db("smartShopDb");
            db.collection("cart", (err, collection)=>{
                if(err)
                {
                    res.status(500);
                    res.json({message: "Not able to connect to the collection"});
                }
                else
                {
                    var product = req.body;
                    collection.deleteMany({userId: product.userId},
                    (err, result)=>{
                        if(err)
                        {
                            res.status(500);
                            res.json({message:err});
                        }
                        else
                        {
                            // console.log(result);
                            res.status(200);
                            res.json({message:true});
                        }
                    })
                }
            })
        }
    });
}

module.exports = {addProduct, getProduct, removeProduct, removeAllProduct};