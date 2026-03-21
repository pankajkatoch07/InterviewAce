const express = require("express");
const { QuestionModel } = require("../models/Question.model");

const questionRouter = express.Router();

// GET questions by techStack
questionRouter.get("/", async (req, res) => {
  try {
    const { techStack, difficulty } = req.query;

    if (!techStack) {
      return res.status(400).json({ error: "techStack query parameter is required" });
    }

    const filter = { techStack: techStack.toLowerCase() };
    if (difficulty) filter.difficulty = difficulty;

    const questions = await QuestionModel.find(filter);

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found for this tech stack" });
    }

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add a new question
questionRouter.post("/", async (req, res) => {
  try {
    const { question, techStack, difficulty } = req.body;

    if (!question || !techStack) {
      return res.status(400).json({ error: "question and techStack are required" });
    }

    const newQuestion = new QuestionModel({ question, techStack, difficulty });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully", data: newQuestion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { questionRouter };
