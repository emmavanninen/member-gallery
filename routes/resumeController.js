  const Member = require("./models/Member");
  const Resume = require("./models/Resume");
  
  module.exports = {
    
    editResume: (params, id) => {
      return new Promise((resolve, reject) => {
        User.findById(id).then(user => {
          if (params.name !== "") user.profile.name = params.name;
          if (params.address !== "") user.address = params.address;
          if (params.email !== "") user.email = params.email;

          user
            .save()
            .then(user => {
              resolve(user);
            })
            .catch(err => {
              reject(err);
            });
        });
      });
    },

    getResume: (req, res) => {
        console.log(req.params);
        
        Resume.findOne({userID: req.params.id})
          .populate("Member")
          .exec()
          .then(resume => {
            console.log(`!!!!!!!!!!!!!!`, resume);

            //! { cart: cart } { name to call in ejs: parameter }
            res.render("partials/resume", { resume: resume });
          })
          .catch(err => {
            throw err;
          });
    }
  };