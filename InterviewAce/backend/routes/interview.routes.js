const express = require("express");
const { InterviewModel } = require("../models/Interview.model");

const interviewRouter = express.Router();

// POST — start a new interview session
interviewRouter.post("/start", async (req, res) => {
  try {
    const { techStack } = req.body;
    if (!techStack) {
      return res.status(400).json({ error: "techStack is required" });
    }

    const interview = new InterviewModel({
      techStack: techStack.toLowerCase(),
      responses: [],
    });
    await interview.save();
    res.status(201).json({ interviewId: interview._id, message: "Interview started" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT — complete an interview and calculate overall score
interviewRouter.put("/complete/:id", async (req, res) => {
  try {
    const interview = await InterviewModel.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    const totalScore = interview.responses.reduce((sum, r) => sum + (r.score || 0), 0);
    const overallScore = interview.responses.length > 0
      ? Math.round(totalScore / interview.responses.length)
      : 0;

    interview.status = "completed";
    interview.overallScore = overallScore;
    await interview.save();

    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET — get interview by ID
interviewRouter.get("/:id", async (req, res) => {
  try {
    const interview = await InterviewModel.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { interviewRouter };
