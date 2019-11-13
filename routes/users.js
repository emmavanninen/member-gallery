const express = require("express");
const router = express.Router();
const passport = require("passport");
const controllers = require('./controllers');
const Member = require("./models/Member");

router.get("/", function(req, res, next) {
  res.send("users main page");
});

router.get("/gallery", controllers.getAllMembers);

router.get("/resume", controllers.getResume);


router.get("/login", (req, res) => {
  if (req.isAuthenticated()) console.log("auth poop");
  res.render("index");
});

router.post("/login", passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
  })
);

router.get("/member-profile", (req, res) => {
  res.render("users/member-profile");
});



router.get("/logout", (req, res) => {
  req.logOut();

  res.redirect("/");
});

// router.get("/logout", (req, res) => {
//   req.logOut();

//   res.redirect("/");
// });

module.exports = router;
