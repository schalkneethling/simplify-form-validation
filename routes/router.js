const express = require("express");
const validate = require("../utils/validate");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/contactus", (req, res) => {
  res.json(validate.contactUs(req.body));
});

module.exports = router;
