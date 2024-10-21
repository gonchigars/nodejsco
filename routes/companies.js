const express = require("express");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const auth = require("../middleware/auth");

const router = express.Router();

// Register a new company
router.post("/register", async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET);
    res.status(201).send({ company, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login for a company
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company || !(await company.comparePassword(password))) {
      return res.status(401).send({ error: "Invalid login credentials" });
    }
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET);
    res.send({ company, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get company profile
router.get("/profile", auth, async (req, res) => {
  res.send(req.company);
});

// Update company profile
router.patch("/profile", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "email",
    "password",
    "description",
    "website",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.company[update] = req.body[update]));
    await req.company.save();
    res.send(req.company);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
