var express = require("express");

var router = express.Router();

var userController = require("../controllers/userController");

router.post("/login", userController.checkUser);
router.post("/exist", userController.existUser);
router.post("/insert", userController.insertUser);

module.exports = router;