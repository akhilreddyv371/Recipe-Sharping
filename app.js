const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/user");
const Recipe = require("./model/recipe");
const passport = require("passport");
const session = require("express-session");
const user = require("./model/user");
const bodyParser = require("body-parser");
const { nextTick } = require("process");
const { isLoggedIn } = require("./middleware");
const { findByIdAndDelete, findById } = require("./model/user");
require("./config/passport");

mongoose
  .connect("mongodb://localhost:27017/RecipeSharing")
  .then(() => {
    console.log("connected to the database");
  })
  .catch((error) => console.error("Database connection error", error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  next();
});

app.get("/myProfile", isLoggedIn, (req, res) => {
  res.send(req.user);
});

app.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  User.register(new User({ username, email }), password, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    passport.authenticate("local")(req, res, () => {
      res.status(200).json({ message: "Registered Successfully" });
    });
  });
});

app.post("/login", passport.authenticate("local"), async (req, res) => {
  const recipe = await Recipe.find();
  // res.status(200).redirect("/", {recipe})
  res.status(200).json({ message: "logged in successfully ",recipe });
});

// Recipe routes

app.post("/addRecipe", isLoggedIn, async (req, res) => {
  const newRecipe = new Recipe({ ...req.body });
  try {
    const saveRecipe = await newRecipe.save();
    res.status(200).json({ message: saveRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/editRecipe/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedRecipe) {
      res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/deleteRecipe/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.all("*", (req, res, next) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(9989, () => {
  console.log("Listening to the port ", 3000);
});
