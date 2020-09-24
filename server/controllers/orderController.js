var mongoClient=require("mongodb").MongoClient;

// var mongodbUrl = "mongodb://localhost:27017/";
var mongodbUrl = "mongodb+srv://akhil:Akhil@07@cluster0.jn8qz.mongodb.net/smartShopDb?retryWrites=true&w=majority";

function addOrder(req, res)
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
            db.collection("orders", (err, collection)=>{
                if(err)
                {
                    res.status(500);
                    res.json({message: "Not able to connect to the collection"});
                }
                else
                {
                    var orderToBeInserted = req.body;
                    collection.insertOne({userId: orderToBeInserted.userId, products: orderToBeInserted.products, totalCost:orderToBeInserted.totalCost},
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

function getOrders(req, res)
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
            db.collection("orders", (err, collection)=>{
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
                            res.json({message:true, order:result});
                        }
                     })
                }
            })
        }
    })
}

module.exports = {addOrder, getOrders};