const express = require("express");
const authService = require("../services/middleware/auth-service");
const router = express.Router();

router.post("/login", authService.authenticate);
router.post("/logout", authService.clearAuth);
router.post("/passport", authService.isLogined);

module.exports = router;
