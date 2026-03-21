const Groq = require("groq-sdk");

// Validate API key on startup
if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY is not configured. Please set it in the .env file.");
  process.exit(1);
}

// Get model from environment or use default
const GROQ_MODEL = process.env.GROQ_MODEL || "llama2-70b-4096";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log(`Using Groq model: ${GROQ_MODEL}`);

const getInterviewFeedback = async (question, answer, techStack) => {
  try {
    if (!question || !answer || !techStack) {
      throw new Error("Missing required parameters: question, answer, and techStack");
    }

    console.log("Generating feedback for:", { techStack, questionLength: question.length, answerLength: answer.length });

    const prompt = `You are an expert technical interviewer for ${techStack} development positions.

A candidate was asked the following interview question:
**Question:** ${question}

The candidate's answer was:
**Answer:** ${answer}

Please evaluate this answer and provide structured feedback in the following format:

**Score: X/10**

**Subject Matter Expertise (X/10):**
[Evaluate technical accuracy, depth of knowledge, and understanding of concepts]

**Communication Skills (X/10):**
[Evaluate clarity, structure, and how well the answer was articulated]

**Strengths:**
- [List 2-3 specific strengths in the answer]

**Areas for Improvement:**
- [List 2-3 specific areas where the answer could be better]

**Ideal Answer Summary:**
[Provide a brief 2-3 sentence summary of what an ideal answer would include]

Be constructive, professional, and specific in your feedback. Rate fairly — don't be overly generous or harsh.`;

    const message = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: GROQ_MODEL,
    });

    if (!message || !message.choices || message.choices.length === 0) {
      throw new Error("No response received from Groq API");
    }

    const text = message.choices[0].message.content;

    if (!text || text.trim().length === 0) {
      throw new Error("Empty response from Groq API");
    }

    // Extract score from the response
    const scoreMatch = text.match(/Score:\s*(\d+)/i);
    const score = scoreMatch ? Math.min(10, Math.max(1, parseInt(scoreMatch[1]))) : 5;

    console.log("Feedback generated successfully with score:", score);

    return {
      feedback: text,
      score: score,
    };
  } catch (error) {
    console.error("Groq Feedback Generation Error:", error.message);
    
    if (error.message.includes("API key")) {
      throw new Error("Groq API key is invalid or expired. Please check your configuration.");
    }
    if (error.message.includes("quota")) {
      throw new Error("Groq API quota exceeded. Please try again later.");
    }
    if (error.message.includes("rate")) {
      throw new Error("Rate limited by Groq API. Please try again in a few moments.");
    }
    
    throw new Error(`Failed to generate feedback: ${error.message}`);
  }
};

module.exports = { getInterviewFeedback };
