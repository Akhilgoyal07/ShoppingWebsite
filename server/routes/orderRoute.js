var express = require("express");

var router = express.Router();

var orderController = require("../controllers/orderController");

router.post("/add",orderController.addOrder);
router.post("/get", orderController.getOrders);

module.exports = router;