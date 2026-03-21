const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  questionText: String,
  answer: String,
  feedback: String,
  score: Number,
}, { _id: false });

const interviewSchema = new mongoose.Schema(
  {
    techStack: {
      type: String,
      required: true,
    },
    responses: [responseSchema],
    overallScore: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InterviewModel = mongoose.model("Interview", interviewSchema);

module.exports = { InterviewModel };
