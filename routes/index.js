const session = require("express-session");
// const MongoStore = require("connect-mongo");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const { genSalt } = require("bcrypt");
const async = require("hbs/lib/async");
// const UserModel = require("../models/User.model");
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/main", (req, res, next) => {
  res.render("main");
});

router.get("/private", (req, res, next) => {
  res.render("private");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  // console.log(req.body);

  try {
    const user = await User.findOne({ username: req.body.username });
    const hashFromDb = user.password;
    const correctPassword = await bcrypt.compare(req.body.password, hashFromDb);

    if (!correctPassword) {
      throw Error("Password incorrect");
    }

    res.redirect("/profile");
  } catch (err) {
    console.log("There was an error, !!!!ME", err);
    res.render("login", { error: "Wrong passwor or username" });
  }
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  console.log(req.body);

  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  const user = {
    username,
    password: hash,
  };

  await UserModel.create(user);

  // res.render("profile", {user});
  res.render("login");
});

module.exports = router;
