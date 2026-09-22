const requireAuth = require("../middleware/requireAuth");
const express = require("express");
const router = express.Router();
const { loginUser, signupUser, getMe } = require("../controllers/userController");

router.get("/me", requireAuth, getMe);
// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;

