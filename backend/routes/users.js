const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
  searchUserByName,
} = require("../controllers/userController");

// GET all users
router.get("/", getUsers);

// SEARCH user by name
// IMPORTANT: must come BEFORE /:id
router.get("/search/:name", searchUserByName);

// GET single user by ID
router.get("/:id", getUserById);

// CREATE user
router.post("/", createUser);

// FULL UPDATE user
router.put("/:id", updateUser);

// PARTIAL UPDATE user
router.patch("/:id", patchUser);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;