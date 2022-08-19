const express = require("express");
const { authenticate } = require("passport");
const passport = require("passport");
const router = express.Router();

//@desc Auth with Google
//@Route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@desc Google auth callback
//@Route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

//@desc Logout User
//@route /auth/logout

//passport 0.6 requires the logout to be async
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
