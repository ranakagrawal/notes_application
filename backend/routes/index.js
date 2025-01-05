const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/jwtMiddleware");

router.use("/auth", require("./authRoutes"));
router.use("/notes",authMiddleware, require("./noteRoutes")); // remember to add middlewares to the notes routes

module.exports = router;