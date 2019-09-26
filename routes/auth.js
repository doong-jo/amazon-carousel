const express = require("express");
const authService = require("../services/middleware/auth-service");

const router = express.Router();

router.post("/login", authService.checkPassport);
router.post("/logout", authService.clearAuth);

module.exports = router;
