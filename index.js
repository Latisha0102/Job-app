const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");
const Jobs = require("./models/jobs.model");

app.use(express.json());

const corsOption = {
  origin: "*",
  credential: true,
};

app.use(cors(corsOption));
initializeDatabase();

app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.json({ data: { jobs } });
  } catch (error) {
    res.status(500).json({ message: "Error in retreving the data" });
  }
});

app.post("/jobs", async (req, res) => {
  const {
    jobRole,
    company,
    location,
    jobType,
    salary,
    description,
    qualifications,
  } = req.body;
  try {
    const job = new Jobs({
      jobRole,
      company,
      location,
      jobType,
      salary,
      description,
      qualifications,
    });
    await job.save();
    res.status(200).json({ message: "Job saved succesfully", data: job });
  } catch (error) {
    res.status(404).json({ message: "Failed to post job" });
  }
});

app.get("/jobs/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Jobs.findById(jobId);
    res.status(201).json({ data: job });
  } catch (error) {
    res.status(404).json({ message: " 404 Not found" });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
