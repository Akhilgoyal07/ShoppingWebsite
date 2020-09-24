var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");

var userRoute = require("./routes/userRoute");
var productRoute = require("./routes/productRoute");
var cartRoute = require("./routes/cartRoute");
var orderRoute = require("./routes/orderRoute");

const PORT = 3000;

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static(path.join(__dirname, "public", "dist", "smartShop")));

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, (err)=>{
    if(!err)
    {
        console.log(`Server is running at PORT ${PORT}`);
    }
})