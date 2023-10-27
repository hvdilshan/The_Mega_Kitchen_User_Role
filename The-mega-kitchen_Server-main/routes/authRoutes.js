const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Review = mongoose.model("Review");
const Organization = mongoose.model("Organization");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("../Middlewares/AuthTokenRequired");
//
require("dotenv").config();
//
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// nodemailer
async function mailer(recieveremail, code) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,

    secure: false, 
    requireTLS: true,
    auth: {
      user: "used2.codershub@gmail.com", 
      pass: "wxvzhpobedwcdvjf", 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "used2.codershub@gmail.com", // sender address
    to: `${recieveremail}`, // list of receivers
    subject: "Signup Verification", // Subject line
    text: `Your Verification Code is ${code}`, // plain text body
    html: `<b>Your Verification Code is ${code}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

//

router.post("/signup", async (req, res) => {
  // console.log('sent by client - ', req.body);
  const { name, email, phone, password, dob, organization } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(422).json({ error: "Email address is already in use" });
  }

  const user = new User({
    name,
    email,
    phone,
    password,
    dob,
    organization,
  });

  try {
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ message: "User Sign up Successfully", token });
  } catch (err) {
    console.log(err);
  }
});

router.post("/verify", (req, res) => {
  console.log("sent by client - ", req.body);
  const { name, email, phone, password, dob, organization } = req.body;
  if (!name || !email || !password || !phone || !dob || !organization) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({ email: email }).then(async (savedUser) => {
    console.log(savedUser);
    if (savedUser) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }
    try {
      let VerificationCode = Math.floor(100000 + Math.random() * 900000);
      let user = [
        {
          name,
          email,
          password,
          phone,
          dob,
          organization,
          VerificationCode,
        },
      ];
      await mailer(email, VerificationCode);
      res.send({
        message: "Verification Code Sent to your Email",
        udata: user,
      });
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  const savedUser = await User.findOne({ email: email });

  if (!savedUser) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }

  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        console.log("Password matched");
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.send({ token });
      } else {
        console.log("Password does not match");
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/account", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    console.log("user ", user);
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      organization: user.organization,
    });
  }
});

router.put("/account/update", async (req, res) => {
  const { name, oldEmail, email, phone, password, organization } = req.body;

  console.log("req.body ", req.body);
  const user = await User.findOne({ email: oldEmail });
  console.log("user ", user);
  if (user) {
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.organization = organization;

    if (password) user.password = password;

    try {
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.send({ message: "User information updated successfully", token });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

router.post("/postReview", async (req, res) => {
  const { name, rate, comment, date } = req.body;

  const review = new Review({
    name,
    rate,
    comment,
    date,
  });

  try {
    await review.save();
    const token = jwt.sign({ _id: review._id }, process.env.JWT_SECRET);
    res.send({ message: "Review Posted Successfully", token });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getReviews", async (req, res) => {
  try {
    const reviews = await Review.find();

    if (!reviews) {
      return res.status(404).json({ error: "No reviews found" });
    }

    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getOrganizations", async (req, res) => {
  try {
    const organizations = await Organization.find();

    if (!organizations) {
      return res.status(404).json({ error: "No organizations found" });
    }

    res.json(organizations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
