const express = require("express");
const router = express.Router();
const passport = require("passport");
const controllers = require('./controllers');
const Member = require("./models/Member");
const resumeController = require("./resumeController");

router.get("/", function(req, res, next) {
  res.send("users main page");
});


router.get("/gallery", controllers.getAllMembers);

router.get("/gallery/:id", resumeController.getResume);

router.get("/login", (req, res) => {
  if (req.isAuthenticated())
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
