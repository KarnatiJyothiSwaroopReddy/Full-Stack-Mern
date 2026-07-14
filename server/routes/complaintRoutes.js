const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  getDashboardStats,
  getMyComplaints,
  getMyStats,
} = require("../controllers/complaintController");

router.post("/", authMiddleware, createComplaint);
router.get("/", authMiddleware, getComplaints);
router.get("/my", authMiddleware, getMyComplaints);
router.get("/my/stats", authMiddleware, getMyStats);
router.get("/stats", authMiddleware, getDashboardStats);
router.put("/:id", authMiddleware, updateComplaintStatus);

module.exports = router;