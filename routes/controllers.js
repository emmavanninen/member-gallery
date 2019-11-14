const Member = require("./models/Member");
const Resume = require("./models/Resume");
const resumeController = require("./resumeController");
const hasher = require("./utils/hasher");

module.exports = {
  registerNewMember: (req, res) => {
    if (req.validationErrors()) {
      res.redirect("/admin/register-new-member");
      return;
    }
    Member.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          req.flash("errors", "Member with given email already exists");
          res.redirect(301, "/admin/register-new-member");
        } else {
          const newMember = new Member();
          newMember.profile.name = req.body.name;
          newMember.email = req.body.email;
          newMember.profile.memberSince = req.body.memberYear;
          if (req.body.active === undefined) {
            newMember.profile.activeEnsemble = false;
          } else if (req.body.active === "on") {
            newMember.profile.activeEnsemble = true;
          } else throw error;
          console.log(newMember);

          newResume = Resume();
          newResume.userID = newMember._id;
          newResume.bio.name = newMember.profile.name;
          newResume.bio.email = newMember.email;

          //! Callback insted of a promise
          newResume.save(error => {
            if (error) {
              req.flash(
                "errors",
                "Something went wrong with member register, please try again"
              );
              throw error;
            } else {
              hasher
                .create(req.body.password)
                .then(hash => {
                  newMember.password = hash;
                  newMember.save(error => {
                    if (error) {
                      //TODO: delete earlier if error
                      newResume.delete();
                      throw error;
                    } else {
                      req.flash("success", `New member registered`);
                      res.redirect("/admin/register-new-member");
                    }
                  });
                })
                .catch(err => {
                  throw err;
                });
            }
          });
        }
      })
      .catch(err => {
        throw err;
      });
  },

  getAllMembers: (req, res, next) => {
    Member.find({})
      .then(members => {
        res.render("gallery", {members: members});
      })
      .catch(error => {
        req.flash("errors", error);
      });
  },

  };
