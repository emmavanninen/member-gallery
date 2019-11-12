let LocalStrategy = require("passport-local");
let Member = require("../../routes/models/Member");
let bcrypt = require("bcryptjs");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    Member.findById(id, function(error, user) {
      done(error, user);
    });
  });

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        Member.findOne({ email: email }, function(error, user) {
          if (error) return done(error, null);

          if (!user) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Member does not exists!")
            );
          }

          bcrypt
            .compare(password, user.password)
            .then(result => {
              if (!result) {
                return done(
                  null,
                  false,
                  req.flash("loginMessage", "Check email or password")
                );
              } else {
                return done(null, user);
              }
            })
            .catch(error => {
              throw error;
            });
        });
      }
    )
  );
};
