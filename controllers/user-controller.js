const Member = require("../routes/models/Member");
const Resume = require("../routes/models/Resume");
// const resumeController = require("./resumeController");
const hasher = require("../routes/utils/hasher");

module.exports = {
  editProfile: (req, res) => {
    if (
      req.body.password !== "" ||
      req.body.password_2 !== "" ||
      req.body.oldPassword !== ""
    ) {
      if (req.body.password !== req.body.password_2)
        req.flash("errors", "Passwords do not match");

      hasher.compare(req.body.oldPassword, req.user.password);
      if (!result) req.flash("errors", "Old password not correct");

      hasher.create(req.body.password);
      req.user.password = hash;

      if (req.body.name !== "") req.user.profile.name = req.body.name;
      if (req.body.email !== "") req.user.email = req.body.email;

      req.user.save(err => {
        if (err) {
          throw err;
        } else {
          req.flash("success", "Profile updated");
          res.redirect("/users/member-profile");
        }
      });
    } else {
      if (req.body.name !== "") req.user.profile.name = req.body.name;
      if (req.body.email !== "") req.user.email = req.body.email;

      req.user.save(err => {
        if (err) throw err;
        else {
          req.flash("success", "Profile updated");
          res.redirect("/users/member-profile");
        }
      });
    }
  },

  editResume: (req, res) => {
    Resume.findOne({ userID: req.user.id }, (err, resume) => {
        
        if (err) throw err;
        
        const updates = Object.keys(req.body);

        updates.forEach(update => {
console.log(update);

            // note[update] = req.body[update];
        });

        resume.save(err => {
          if (err) throw err;
          else {
            req.flash("success", "Resume updated");
            res.redirect("/users/member-profile");
          }
        });
      })
  }
};
