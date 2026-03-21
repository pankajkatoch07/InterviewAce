const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    techStack: {
      type: String,
      required: true,
      enum: ["mern", "node", "java", "react", "javascript", "python"],
      lowercase: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QuestionModel = mongoose.model("Question", questionSchema);

module.exports = { QuestionModel };
