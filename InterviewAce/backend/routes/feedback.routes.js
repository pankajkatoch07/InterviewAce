const express = require("express");
const { InterviewModel } = require("../models/Interview.model");
const { getInterviewFeedback } = require("../services/groq.service");

const feedbackRouter = express.Router();

// POST — submit an answer and get AI feedback
feedbackRouter.post("/", async (req, res) => {
  try {
    const { question, answer, techStack, interviewId, questionId } = req.body;

    // Validate required fields
    if (!question || !answer || !techStack) {
      return res.status(400).json({
        error: "question, answer, and techStack are required",
      });
    }

    if (!interviewId) {
      return res.status(400).json({
        error: "interviewId is required to save feedback",
      });
    }

    console.log(`Feedback requested for interview: ${interviewId}`);

    // Get AI feedback from Groq
    const { feedback, score } = await getInterviewFeedback(question, answer, techStack);

    // Update the interview session with the feedback
    const updatedInterview = await InterviewModel.findByIdAndUpdate(
      interviewId,
      {
        $push: {
          responses: {
            questionId,
            questionText: question,
            answer,
            feedback,
            score,
          },
        },
      },
      { new: true }
    );

    if (!updatedInterview) {
      console.warn(`Interview not found: ${interviewId}`);
      return res.status(404).json({ error: "Interview not found" });
    }

    console.log(`Feedback saved for interview: ${interviewId}`);

    res.status(200).json({
      feedback,
      score,
    });
  } catch (error) {
    console.error("Feedback error:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
});

module.exports = { feedbackRouter };
