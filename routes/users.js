const express = require("express");
const router = express.Router();
const passport = require("passport");
const Member = require("./models/Member");

router.get("/", function(req, res, next) {
  res.send("users page");
});

router.get("/gallery", (req, res) => {
  res.render("gallery");
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) console.log("auth poop");
  res.render("index");
});

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
  })
);

router.get("/logout", (req, res) => {
  req.logOut();

  res.redirect("/");
});

// router.get("/logout", (req, res) => {
//   req.logOut();

//   res.redirect("/");
// });

module.exports = router;
