const path = require("path");
const logger = require("morgan");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const expressValidator = require("express-validator");

let MongoStore = require("connect-mongo")(session);

const adminRouter = require("./routes/admin");

require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(`MongoDB Error: ${err}`));

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true
    }),
    cookie: {
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
require("./routes/passport/passport.js")(passport);

app.use(
  expressValidator({
    errorFormatter: (param, message, value) => {
      let namespace = param.split(".");
      let root = namespace.shift();
      let formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }

      return {
        param: formParam,
        message: message,
        value: value
      };
    }
  })
);

app.use((req, res, next) => {
  res.locals.user = req.user;

  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.errorValidate = req.flash("errorValidate");
  res.locals.loginMsg = req.flash("loginMsg");

  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
