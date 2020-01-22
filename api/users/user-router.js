const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("./user-model");
const protected = require("../middleware/protected");
const secret = require("../../data/secrets");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = await userModel.add(req.body);

    res.status(201).json(user);
  } catch (err) {
    console.log("err-reg", err);
    next();
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username
        },
        secret.jwt,
        { expiresIn: "3d" }
      );
      res.status(200).json({ token, message: `Welcome ${user.username}` });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log("err-reg", err);
    next();
  }
});

router.get("/users", protected(), async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    console.log("Get-err", err);
    next(err);
  }
});

// Keep fpr later reference/ alternate way of doing this.

// function signToken(user) {
//   const payload = {
//     id: user.id,
//     username: user.username
//   };

//   const secret = process.env.JWT_SECRET || "Something something, funny funny";

//   const options = {
//     expiresIn: "48hr"
//   };

//   return jwt.sign(payload, secret, options);
// }

module.exports = router;
