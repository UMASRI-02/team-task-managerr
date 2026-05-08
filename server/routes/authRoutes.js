const express = require("express");
const router = express.Router();

const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {

  try {

    const { name, email, password ,role} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const newUser = new User({
      name,
      email,
      password,
      role
    });

    await newUser.save();

    res.json("Signup successful");

  } catch (error) {

    res.status(500).json(error.message);

  }
});

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    if (user.password !== password) {
      return res.status(400).json("Invalid password");
    }

    res.json({
      token: "loggedin",
      user
    });

  } catch (error) {

    res.status(500).json(error.message);

  }
});

module.exports = router;