const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  requirements: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
    trim: true,
  },
  salary: {
    type: String,
    trim: true,
  },
  applicationDeadline: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
