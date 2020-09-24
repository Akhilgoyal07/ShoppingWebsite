var express = require("express");

var router = express.Router();

var cartController = require("../controllers/cartController");

router.post("/add",cartController.addProduct);
router.post("/get",cartController.getProduct);
router.post("/remove",cartController.removeProduct);
router.post("/removeAll",cartController.removeAllProduct);

module.exports = router;