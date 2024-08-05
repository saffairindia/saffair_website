const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("./../utils/error");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto")

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists by email
    const existingEmail = await Users.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if the username already exists
    const existingUsername = await Users.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new Users({
      username,
      email,
      password: hashPassword,
    });

    // Save the user to the database
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if both email and password are provided
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      throw errorHandler(400, "All fields are required");
    }

    // Find user by email
    const validUser = await Users.findOne({ email });
    if (!validUser) {
      throw errorHandler(404, "User not found");
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      throw errorHandler(400, "Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Add an expiration time for security
    );

    // Exclude the password from the user data
    const { password: pass, ...userData } = validUser._doc;

    // Set the JWT token as a cookie in the response
    res.cookie("access_token", token, {
      httpOnly: true,
    });

    // Send the user data in the response
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
});

router.post("/google", async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new Users({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
});


router.post("/recovery", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const buffer = new Uint8Array(32);
    crypto.getRandomValues(buffer);
    const resetToken = Buffer.from(buffer).toString('hex');

    // Set expiration time (1 hour from now)
    const resetTokenExpiration = Date.now() + 3600000;

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Generate reset URL
    const resetUrl = `${process.env.EMAILURL}/?token=${resetToken}`;

    // Send password reset email using Firebase
    const actionCodeSettings = {
      url: resetUrl,
      handleCodeInApp: true,
      // dynamicLinkDomain: process.env.DYNAMIC_LINK_DOMAIN,
      // iOS: {
      //   bundleId: "com.yourapp.ios",
      // },
      // android: {
      //   packageName: "com.yourapp.android",
      //   installApp: true,
      //   minimumVersion: "12",
      // },
    };

    res.status(200).json({ actionCodeSettings });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Verify reset token
router.get("/verify-reset-token", async (req, res) => {
  const { token } = req.query;

  try {
    const user = await Users.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    res.json({ valid: !!user });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Rate limiting
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many password reset attempts, please try again later.",
});

// Reset password
router.post("/reset", resetLimiter, async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const { token, password } = req.body;

  try {
    const user = await Users.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
});

module.exports = router;
