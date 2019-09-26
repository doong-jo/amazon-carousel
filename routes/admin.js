const express = require("express");
const adminService = require("../services/middleware/admin-service");
const { isAdmin } = require("../services/middleware/auth-service");

const router = express.Router();

router.get("/", isAdmin, adminService.serveRawData);
router.get("/user", isAdmin, adminService.serveRawData);
router.get("/item", isAdmin, adminService.serveRawData);

module.exports = router;
