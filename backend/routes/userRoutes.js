const express = require("express");
const User = require("../models/User");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// READ
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
