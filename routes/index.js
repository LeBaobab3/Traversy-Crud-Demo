const express = require("express");
const router = express.Router();

//@desc Lgoin/landing page
//@router GET /
router.get("/", (req, res) => {
  res.send("Login");
});

module.exports = router;
//so our
