// In confessionroute.js or similar
const express = require("express");
const router = express.Router();
const AuthToken = require('./middleware/Auth');
const Confession = require('../models/confession');

router.post("/confession", AuthToken, async (req, res) => {
  try {
    const { text } = req.body;
    const confession = new Confession({
      text,
      userId: req.user._id, // saved but never sent to frontend
      createdAt: new Date()
    });
    await confession.save();
    res.status(201).json({ message: "Confession posted!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
