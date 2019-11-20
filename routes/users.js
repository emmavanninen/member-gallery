const express = require("express");
const router = express.Router();
const passport = require("passport");
const Member = require("./models/Member");
const Resume = require("./models/Resume");
const controllers = require('../controllers/controllers');
const userController = require("../controllers/user-controller");
const resumeController = require("../controllers/resumeController");

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
    if(!req.isAuthenticated()) res.redirect('/')

    Resume.findOne({userID: req.user.id}, (err, resume) =>{
      if (err) throw err;
    res.render("users/member-profile", {resume: resume});
    });
});

router.put("/member-profile/profile", userController.editProfile)

router.put("/member-profile/resume", userController.editResume)

   


router.get("/logout", (req, res) => {
  req.logOut();

  res.redirect("/");
});


module.exports = router;
