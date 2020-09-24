var mongoClient=require("mongodb").MongoClient;

// var mongodbUrl = "mongodb://localhost:27017/";
var mongodbUrl = "mongodb+srv://akhil:Akhil@07@cluster0.jn8qz.mongodb.net/smartShopDb?retryWrites=true&w=majority";

function checkUser(req, res)
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
            db.collection("users", (err, collection)=>{
                if(err)
                {
                    res.status(500);
                    res.json({message: "Not able to connect to the collection"});
                }
                else
                {
                    var userToBeChecked = req.body;
                    collection.findOne({email:userToBeChecked.email,
                    password:userToBeChecked.password}, (err, result)=>{
                        if(err)
                        {
                            res.status(500);
                            res.json({message:err});
                        }
                        else
                        {
                            if(result)
                            {
                                res.status(200);
                                res.json({message:true, user:result});
                                // console.log(res);
                            }
                            else
                            {
                                res.status(201);
                                res.json({message:false});
                                console.log("not found");
                            }
                        }
                    })
                }
            })
        }
    })
}

function existUser(req, res)
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
            db.collection("users", (err, collection)=>{
                if(err)
                {
                    res.status(500);
                    res.json({message: "Not able to connect to the collection"});
                }
                else
                {
                    var userToBeChecked = req.body;
                    collection.findOne({email:userToBeChecked.email},
                    (err, result)=>{
                        if(err)
                        {
                            res.status(500);
                            res.json({message:err});
                        }
                        else
                        {
                            if(result)
                            {
                                res.status(201);
                                res.json({message:false});
                                // console.log(result);
                            }
                            else
                            {
                                res.status(200);
                                res.json({message:true});
                                console.log("not found");
                            }
                        }
                    })
                }
            })
        }
    })
}

function insertUser(req, res)
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
            db.collection("users", (err, collection)=>{
                if(err)
                {
                    res.status(500);
                    res.json({message: "Not able to connect to the collection"});
                }
                else
                {
                    var userToBeInserted = req.body;
                    collection.insertOne({firstName: userToBeInserted.firstName, lastName:userToBeInserted.lastName,
                    email:userToBeInserted.email, password:userToBeInserted.password, birthDate:userToBeInserted.birthDate,
                    phoneNumber:userToBeInserted.phoneNumber},
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


module.exports = {checkUser, existUser, insertUser};