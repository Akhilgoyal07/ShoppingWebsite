var mongoClient=require("mongodb").MongoClient;

// var mongodbUrl = "mongodb://localhost:27017/";
var mongodbUrl = "mongodb+srv://akhil:Akhil@07@cluster0.jn8qz.mongodb.net/smartShopDb?retryWrites=true&w=majority";

function getAllProducts(req, res)
{
    mongoClient.connect(mongodbUrl, {useUnifiedTopology:true}, (err, dbHost)=>{
        if(err)
        {
            res.status(500);
            res.json({message:"Error connecting to the mongodb server"});
        }
        else
        {
            var db=dbHost.db("smartShopDb");
            db.collection("products",(err, coll)=>{
                if(err)
                {
                    res.status(500);
                    res.json({message:"Error connecting to the mongodb server"});
                }
                else
                {
                    coll.find({}).toArray((err, data)=>{
                        if(err)
                        {
                            res.status(500);
                            res.json({message:"Error connecting to the mongodb server"});
                        }
                        else
                        {
                            // console.log("Result of find all questions : ",data);
                            res.json(data);
                        }
                     })
                }
            })
        }
    })
}


module.exports = {getAllProducts};