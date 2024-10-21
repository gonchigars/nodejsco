const express = require("express");
const Job = require("../models/Job");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a new job posting
router.post("/", auth, async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      company: req.company._id,
    });
    await job.save();
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all job postings
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).populate("company", "name");
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific job posting
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "company",
      "name description website"
    );
    if (!job) {
      return res.status(404).send();
    }
    res.send(job);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a job posting
router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "description",
    "requirements",
    "location",
    "salary",
    "applicationDeadline",
    "isActive",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const job = await Job.findOne({
      _id: req.params.id,
      company: req.company._id,
    });
    if (!job) {
      return res.status(404).send();
    }
    updates.forEach((update) => (job[update] = req.body[update]));
    await job.save();
    res.send(job);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a job posting
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      company: req.company._id,
    });
    if (!job) {
      return res.status(404).send();
    }
    res.send(job);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
