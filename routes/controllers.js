const Member = require("./models/Member");
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

          hasher
            .create(req.body.password)
            .then(hash => {
              newMember.password = hash;
              newMember.save(error => {
                if (error) throw error;
                else {
                  req.flash("success", `New member registered`);
                  res.redirect("/admin/register-new-member");
                }
              });
            })
            .catch(err => {
              throw err;
            });
        }
      })
      .catch(err => {
        throw err;
      });
  }
};
