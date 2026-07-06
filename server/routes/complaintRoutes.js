const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  getDashboardStats,
} = require("../controllers/complaintController");

router.post("/", authMiddleware, createComplaint);

router.get("/", getComplaints);

router.get("/stats", getDashboardStats);

router.put("/:id", updateComplaintStatus);

module.exports = router;