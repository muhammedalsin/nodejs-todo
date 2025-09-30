const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");
const {user_edit_get,user_put} = require("../controllers/userControllers")




router.get("/edit/:id",user_edit_get);

// Update User
router.put("/edit/:id", user_put);

module.exports = router;
