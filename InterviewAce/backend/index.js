const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const { questionRouter } = require("./routes/question.routes");
const { feedbackRouter } = require("./routes/feedback.routes");
const { interviewRouter } = require("./routes/interview.routes");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/questions", questionRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/interviews", interviewRouter);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "InterviewAce API is running",
    endpoints: {
      questions: "/api/questions?techStack=mern",
      feedback: "POST /api/feedback",
      interviews: "POST /api/interviews/start",
    },
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
