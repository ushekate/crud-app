const express = require("express");
const User = require("../models/User");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// READ all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// NEW: READ single user by ID (for editing)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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









// const express = require("express");
// const User = require("../models/User");
// const router = express.Router();

// // CREATE
// router.post("/", async (req, res) => {
//   const user = await User.create(req.body);
//   res.json(user);
// });

// // READ
// router.get("/", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// // UPDATE
// router.put("/:id", async (req, res) => {
//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(user);
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });

// module.exports = router;
