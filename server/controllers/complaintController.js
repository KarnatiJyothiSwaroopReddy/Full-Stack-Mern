const Complaint = require("../models/Complaint");

// Create Complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    const complaint = await Complaint.create({
      userId: req.user.id,
      title,
      category,
      description,
      status: "Pending",
    });

    res.status(201).json({
      message: "Complaint Submitted Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Complaint Status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Complaint Status Updated Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const complaints = await Complaint.find();

    const total = complaints.length;

    const pending = complaints.filter(
      (c) => c.status === "Pending"
    ).length;

    const inProgress = complaints.filter(
      (c) => c.status === "In Progress"
    ).length;

    const resolved = complaints.filter(
      (c) => c.status === "Resolved"
    ).length;

    res.status(200).json({
      total,
      pending,
      inProgress,
      resolved,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};