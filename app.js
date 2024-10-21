const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { sendJobAlert } = require("./utils/emailService");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const companiesRouter = require("./routes/companies");
const jobsRouter = require("./routes/jobs");

app.use("/api/companies", companiesRouter);
app.use("/api/jobs", jobsRouter);

// Middleware to send job alerts
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function (body) {
    originalJson.call(this, body);
    if (
      req.method === "POST" &&
      req.path === "/api/jobs" &&
      res.statusCode === 201
    ) {
      // Send job alert when a new job is posted
      sendJobAlert("example@recipient.com", body);
    }
    return this;
  };
  next();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
