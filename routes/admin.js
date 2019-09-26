const express = require("express");
const adminService = require("../services/middleware/admin-service");

const router = express.Router();

router.get("/", adminService.serveRawData);
router.get("/user", adminService.serveRawData);
router.get("/item", adminService.serveRawData);

module.exports = router;
