const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobRole: String,
  company: String,
  location: String,
  jobType: String,
  salary: Number,
  description: String,
  qualifications: [String],
});

const Jobs = mongoose.model("Jobs", jobSchema);

module.exports = Jobs;
