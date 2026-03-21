# InterviewAce - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack & Why](#tech-stack--why)
3. [Architecture Overview](#architecture-overview)
4. [Data Flow](#data-flow)
5. [Project Structure](#project-structure)
6. [Backend Explained](#backend-explained)
7. [Frontend Explained](#frontend-explained)
8. [Database Schema](#database-schema)
9. [API Endpoints](#api-endpoints)
10. [How Features Work](#how-features-work)
11. [Setup Instructions](#setup-instructions)
12. [Deployment](#deployment-notes)

---

## Project Overview

**InterviewAce** is an AI-powered text-based interview prep platform designed to help job candidates practice technical interviews in real-time with instant AI feedback.

### What It Does:
- **Generates Questions**: Fetches curated interview questions for 6 different tech stacks
- **AI Feedback**: Uses Groq AI to analyze answers and provide structured feedback (scores, strengths, areas to improve)
- **Tracks Progress**: Stores interview sessions with individual scores and overall performance metrics
- **Persistent Sessions**: Users can review past interviews and their detailed feedback

### Who It's For:
- Software engineers preparing for job interviews
- Students learning to answer technical questions better
- Anyone wanting to practice and track improvement

---

## Tech Stack & Why

### **Frontend Stack**

#### **React 19.2.4** - UI Framework
- **Why**: React is a declarative, component-based library perfect for building interactive user interfaces
- **What it does**: Manages the UI state, renders pages dynamically, and handles user interactions
- **How it helps**: Makes building complex UIs simpler by breaking them into reusable components

#### **React Router 7.13.1** - Navigation/Routing
- **Why**: Single Page Application (SPA) needs client-side routing without page reloads
- **What it does**: Handles navigation between pages (Home → Select Tech Stack → Interview → Results)
- **How it works in our app**: 
  ```
  / → Home page
  /interviews → Tech stack selection
  /interview/:techStack → Interview page
  /results/:interviewId → Results page
  ```

#### **Axios 1.13.6** - HTTP Client
- **Why**: Makes API calls to the backend easier and cleaner than native fetch
- **What it does**: Sends requests to backend endpoints and receives responses
- **Example**: `axios.get('/api/questions?techStack=mern')` fetches questions from backend

#### **Vite 8.0.1** - Build Tool
- **Why**: Modern, fast build tool (much faster than webpack)
- **What it does**: Bundles your React code into optimized files for production
- **Benefits**: Super fast dev server with hot reload (code updates without refreshing page)

#### **React Icons 5.6.0** - Icon Library
- **Why**: Professional-looking icons for UI (chevrons, lightning bolt, chart bars, etc.)
- **What it does**: Provides SVG icons as React components

#### **ESLint 9.39.4** - Code Quality Tool
- **Why**: Catches code errors and enforces consistent code style
- **What it does**: Scans your code and warns about issues like unused variables, undefined functions

---

### **Backend Stack**

#### **Node.js + Express 4.21.0** - Server Framework
- **Why**: JavaScript runtime + web framework for building REST APIs
- **What it does**: Handles HTTP requests, processes business logic, connects to database
- **Example workflow**: 
  1. Frontend sends: `POST /api/feedback` with question, answer, techStack
  2. Express receives request → sends to service → calls Groq AI → returns feedback

#### **MongoDB 8.5.0 (via Mongoose)** - Database
- **Why**: NoSQL database that stores data as flexible JSON-like documents
- **What it does**: Stores interview questions, interview sessions, and responses
- **Why not SQL?**: MongoDB is flexible for this use case (no strict schema needed), easier to get started

#### **Mongoose 8.5.0** - MongoDB Object Mapper
- **Why**: Makes working with MongoDB easier by providing schema validation and helper methods
- **What it does**: 
  - Defines data structure (Question, Interview models)
  - Validates data before saving (e.g., ensures required fields exist)
  - Provides clean query methods like `.find()`, `.save()`, `.updateOne()`

#### **Groq SDK 0.4.2** - AI Service Integration
- **Why**: Groq provides ultra-fast AI inference (faster than OpenAI for certain models)
- **What it does**: Sends interview answers to Groq's AI model which analyzes and provides feedback
- **Model used**: Mixtral-8x7b-32768 (high performance, open-source model)
- **Why Groq over alternatives?**: 
  - Faster inference speed = quicker feedback to users
  - Cost-effective
  - Great for real-time applications

#### **CORS 2.8.5** - Cross-Origin Resource Sharing
- **Why**: Frontend (http://localhost:3000) and Backend (http://localhost:8080) run on different ports
- **What it does**: Allows frontend to make requests to backend without security errors
- **Without it**: Browser blocks requests with "CORS error"

#### **Dotenv 16.4.5** - Environment Variables
- **Why**: Stores sensitive data (API keys, database URLs) safely
- **What it does**: Loads variables from `.env` file into `process.env`
- **Example**: `GROQ_API_KEY`, `MONGODB_URI`
- **Security**: Never commit `.env` to git (add to `.gitignore`)

#### **Nodemon 3.1.0** - Development Tool
- **Why**: Auto-restarts server when you change code (no manual restart needed)
- **When used**: Only for development (`npm run dev`)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                         │
│                    React Frontend                            │
│  (Home, Interview, Results pages + Navigation)              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Requests (Axios)
                       │ JSON Data Exchange
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Node.js Server                            │
│                   Express.js API                             │
│                                                              │
│  Routes:                                                     │
│  ├─ /api/questions (GET) → Fetch questions                  │
│  ├─ /api/interviews (POST/PUT/GET) → Manage sessions        │
│  └─ /api/feedback (POST) → Get AI feedback                  │
│                                                              │
│  Services:                                                   │
│  └─ Groq Service → Calls Groq AI for feedback               │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
    ┌──────────────┐         ┌──────────────┐
    │  MongoDB     │         │  Groq AI     │
    │  Database    │         │  API         │
    │              │         │              │
    │ Collections: │         │ Analyzes:    │
    │ - Questions  │         │ - Questions  │
    │ - Interviews │         │ - Answers    │
    │ - Responses  │         │ - Scores     │
    └──────────────┘         └──────────────┘
```

### **Three-Tier Architecture**:

1. **Presentation Layer (Frontend - React)**
   - What user sees
   - Handles UI state and user interactions
   - Sends/receives data to/from backend

2. **Business Logic Layer (Backend - Express)**
   - Processes data
   - Validates input
   - Integrates with AI service
   - Stores/retrieves data

3. **Data Layer (MongoDB)**
   - Persists data
   - Returns stored information
   - Tracks history

---

## Data Flow

### **Scenario: User Takes an Interview**

```
1. User clicks "Start Practicing" on home page
   ↓
2. Selects a tech stack (MERN/Node/Java/etc)
   ↓
3. Frontend makes TWO parallel requests:
   
   Request 1: GET /api/questions?techStack=mern
   └─→ Backend queries MongoDB
       └─→ Returns 5-10 interview questions
       
   Request 2: POST /api/interviews/start
   └─→ Backend creates new Interview document in MongoDB
       └─→ Returns interviewId (unique identifier)
   ↓
4. User sees questions and types an answer
   ↓
5. User clicks "Submit Answer"
   ↓
6. Frontend sends: POST /api/feedback
   {
     question: "What is React?",
     answer: "React is a JavaScript library...",
     techStack: "react",
     interviewId: "507f1f77bcf86cd799439011",
     questionId: "507f3d88bcf86cd799439012"
   }
   ↓
7. Backend receives request:
   ├─ Validates all required fields exist
   ├─ Calls Groq AI service with question & answer
   ├─ Groq AI returns feedback + score (1-10)
   ├─ Saves response to Interview in MongoDB
   └─ Returns feedback to frontend
   ↓
8. Frontend displays AI feedback to user
   ↓
9. User continues to next question (repeat from step 4)
   ↓
10. User completes all questions and clicks "Finish"
    ↓
11. Frontend sends: PUT /api/interviews/complete/:id
    └─→ Backend calculates average score
        └─→ Updates Interview status to "completed"
    ↓
12. Frontend navigates to Results page
    ↓
13. Frontend requests: GET /api/interviews/:id
    └─→ Backend returns complete interview with all responses
    ↓
14. Results page displays:
    ├─ Overall score (average)
    ├─ Individual question scores
    ├─ Detailed feedback for each answer
    └─ Option to start new interview
```

---

## Project Structure

```
InterviewAce/
│
├── backend/                          # Backend application (Node.js + Express)
│   │
│   ├── index.js                      # Main server file - starts Express app
│   ├── package.json                  # Backend dependencies
│   ├── seed.js                       # Script to populate database with sample questions
│   │
│   ├── config/
│   │   └── db.js                     # MongoDB connection configuration
│   │
│   ├── models/                       # Database schemas (how data is structured)
│   │   ├── Question.model.js         # Question schema
│   │   └── Interview.model.js        # Interview schema
│   │
│   ├── routes/                       # API endpoints (defined by path and method)
│   │   ├── question.routes.js        # GET/POST questions
│   │   ├── interview.routes.js       # POST/PUT/GET interviews
│   │   └── feedback.routes.js        # POST feedback (calls Groq AI)
│   │
│   └── services/
│       └── groq.service.js           # Groq AI integration - generates feedback
│
├── frontend/                         # Frontend application (React + Vite)
│   │
│   ├── index.html                    # Entry HTML file
│   ├── vite.config.js                # Vite build configuration
│   ├── package.json                  # Frontend dependencies
│   ├── eslint.config.js              # Code quality rules
│   │
│   ├── public/                       # Static files (images, favicon, etc)
│   │
│   └── src/
│       ├── main.jsx                  # Entry point - renders React app
│       ├── App.jsx                   # Main app component with routing
│       ├── App.css                   # App-level styles
│       ├── index.css                 # Global styles
│       ├── assets/                   # Images, fonts, etc
│       │
│       ├── components/               # Reusable components
│       │   ├── NavBar.jsx            # Navigation bar (appears on all pages)
│       │   └── NavBar.css
│       │
│       └── pages/                    # Full page components (routed)
│           ├── Home.jsx              # Landing page with features
│           ├── Home.css
│           ├── InterviewSelect.jsx   # Tech stack selection page
│           ├── InterviewSelect.css
│           ├── Interview.jsx         # Main interview page (questions + answers)
│           ├── Interview.css
│           ├── Results.jsx           # Results/Review page
│           └── Results.css
```

### **Key Directories Explained**:

- **models/**: Define structure of data in MongoDB (like table schemas in SQL)
- **routes/**: API endpoints - how frontend communicates with backend
- **services/**: Business logic - handles complex operations (like calling Groq AI)
- **pages/**: Full screens in the application (each gets a route)
- **components/**: Reusable UI pieces (NavBar, buttons, etc)

---

## Backend Explained

### **Entry Point: index.js**

```javascript
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware (runs on every request)
app.use(express.json());        // Parse JSON request bodies
app.use(cors());                // Allow frontend to access backend

// Routes (define what each endpoint does)
app.use("/api/questions", questionRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/interviews", interviewRouter);

// Start server
const startServer = async () => {
  await connectDB();            // Connect to MongoDB
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
```

**What happens**:
1. Creates Express server
2. Sets up middleware (JSON parsing, CORS)
3. Registers routes (API endpoints)
4. Connects to MongoDB
5. Listens for incoming requests on port 8080

---

### **Database Configuration: config/db.js**

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);  // Stop server if connection fails
  }
};

module.exports = connectDB;
```

**What it does**:
- Connects to MongoDB using URL from environment variables
- If connection succeeds: log and continue
- If connection fails: log error and stop server

---

### **Models: How Data is Structured**

#### **Question Model** (models/Question.model.js)

```javascript
const questionSchema = new mongoose.Schema({
  question: String,              // The actual question text
  techStack: String,             // Which tech stack: "mern", "node", "react", etc
  difficulty: String,            // "easy", "medium", or "hard"
}, { timestamps: true });        // Automatically adds createdAt, updatedAt
```

**What it stores**:
- Interview questions
- Tech stack they belong to
- Difficulty level

**Example document in MongoDB**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "question": "What is the difference between var, let, and const?",
  "techStack": "javascript",
  "difficulty": "medium",
  "createdAt": "2024-03-20T10:30:00Z",
  "updatedAt": "2024-03-20T10:30:00Z"
}
```

---

#### **Interview Model** (models/Interview.model.js)

```javascript
const responseSchema = new mongoose.Schema({
  questionId: ObjectId,      // Reference to Question
  questionText: String,      // Question text (stored for history)
  answer: String,            // User's answer
  feedback: String,          // AI feedback from Groq
  score: Number,             // Score 1-10
}, { _id: false });

const interviewSchema = new mongoose.Schema({
  techStack: String,         // "mern", "node", "react", etc
  responses: [responseSchema], // Array of user responses
  overallScore: Number,      // Average of all response scores
  status: String,            // "in-progress" or "completed"
}, { timestamps: true });
```

**What it stores**:
- Interview sessions
- All responses from user within that session
- Scores and feedback
- Overall performance

**Example document**:
```json
{
  "_id": "507f3d88bcf86cd799439012",
  "techStack": "mern",
  "status": "completed",
  "overallScore": 7,
  "responses": [
    {
      "questionId": "507f1f77bcf86cd799439011",
      "questionText": "What is React?",
      "answer": "React is a JavaScript library for building UIs...",
      "feedback": "**Score: 8/10**\n**Subject Matter Expertise (8/10)**\n...",
      "score": 8
    },
    {
      "questionId": "507f1f77bcf86cd799439013",
      "questionText": "Explain promises",
      "answer": "A promise is an object that...",
      "feedback": "**Score: 6/10**\n...",
      "score": 6
    }
  ],
  "createdAt": "2024-03-20T10:35:00Z",
  "updatedAt": "2024-03-20T10:45:00Z"
}
```

---

### **Routes: API Endpoints**

#### **Question Routes** (routes/question.routes.js)

```javascript
GET /api/questions?techStack=mern&difficulty=medium
```
- **Purpose**: Fetch interview questions
- **Query Parameters**:
  - `techStack` (required): mern, node, java, react, javascript, python
  - `difficulty` (optional): easy, medium, hard
- **Response**: Array of question objects
- **Backend code**:
  ```javascript
  const filter = { techStack: techStack.toLowerCase() };
  if (difficulty) filter.difficulty = difficulty;
  const questions = await QuestionModel.find(filter);
  res.status(200).json(questions);
  ```

```javascript
POST /api/questions
Body: {
  "question": "What is Node.js?",
  "techStack": "node",
  "difficulty": "easy"
}
```
- **Purpose**: Add a new question to database (admin feature)
- **Response**: Newly created question object

---

#### **Interview Routes** (routes/interview.routes.js)

```javascript
POST /api/interviews/start
Body: { "techStack": "mern" }
```
- **Purpose**: Create new interview session
- **Response**: `{ interviewId: "507f3d88..." }`
- **Backend code**:
  ```javascript
  const interview = new InterviewModel({
    techStack: techStack.toLowerCase(),
    responses: [],
    status: "in-progress"
  });
  await interview.save();
  res.status(201).json({ interviewId: interview._id });
  ```

```javascript
GET /api/interviews/:id
```
- **Purpose**: Fetch complete interview with all responses
- **Response**: Full interview object with responses array
- **Used on**: Results page

```javascript
PUT /api/interviews/complete/:id
```
- **Purpose**: Mark interview as completed and calculate overall score
- **Response**: Updated interview object
- **Backend logic**:
  ```javascript
  const totalScore = responses.reduce((sum, r) => sum + (r.score || 0), 0);
  const overallScore = Math.round(totalScore / responses.length);
  interview.status = "completed";
  interview.overallScore = overallScore;
  await interview.save();
  ```

---

#### **Feedback Routes** (routes/feedback.routes.js)

```javascript
POST /api/feedback
Body: {
  "question": "What is React?",
  "answer": "React is a JavaScript library...",
  "techStack": "react",
  "interviewId": "507f3d88...",
  "questionId": "507f1f77..."
}
```
- **Purpose**: Submit answer, get AI feedback
- **What happens**:
  1. Validates all required fields
  2. Calls Groq service (see below)
  3. Stores response in Interview
  4. Returns feedback + score
- **Response**:
  ```json
  {
    "feedback": "**Score: 7/10**\n\n**Subject Matter Expertise...**",
    "score": 7
  }
  ```

---

### **Services: Groq AI Integration** (services/groq.service.js)

This is where the magic happens! This service communicates with Groq AI.

```javascript
const getInterviewFeedback = async (question, answer, techStack) => {
  // 1. Create a detailed prompt asking Groq to evaluate
  const prompt = `You are an expert technical interviewer for ${techStack}.
  
  Question: "${question}"
  Answer: "${answer}"
  
  Provide feedback in this format:
  Score: X/10
  Subject Matter Expertise...
  Communication Skills...
  Strengths:
  - [points]
  Areas for Improvement:
  - [points]
  Ideal Answer Summary: [summary]`;

  // 2. Send to Groq API using Mixtral model
  const message = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "mixtral-8x7b-32768"
  });

  // 3. Extract response
  const feedbackText = message.choices[0].message.content;

  // 4. Extract score from response
  const scoreMatch = feedbackText.match(/Score:\s*(\d+)/i);
  const score = Math.min(10, Math.max(1, parseInt(scoreMatch[1])));

  // 5. Return feedback and score
  return { feedback: feedbackText, score };
};
```

**Why Groq is used**:
- **Ultra-fast**: Returns responses in seconds
- **Cost-effective**: Free/cheap API tier
- **Mixtral model**: Open-source, performs well on technical questions
- **No manual grading**: Automated feedback instantly

**Error handling**:
```javascript
if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY not set");
  process.exit(1);
}
```

---

## Frontend Explained

### **Component Structure**

```
App.jsx (Main app with routing)
├── NavBar.jsx (Always visible)
└── Routes:
    ├── / → Home.jsx (Landing page)
    ├── /interviews → InterviewSelect.jsx (Tech stack selection)
    ├── /interview/:techStack → Interview.jsx (Questions + Answers)
    └── /results/:interviewId → Results.jsx (Results review)
```

---

### **App.jsx: Main Component**

```javascript
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import InterviewSelect from './pages/InterviewSelect';
import Interview from './pages/Interview';
import Results from './pages/Results';

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interviews" element={<InterviewSelect />} />
          <Route path="/interview/:techStack" element={<Interview />} />
          <Route path="/results/:interviewId" element={<Results />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
```

**What it does**:
- `<Routes>` and `<Route>`: React Router components for page navigation
- `path`: URL path
- `element`: Component to render for that path
- `:techStack` and `:interviewId`: Dynamic URL parameters

---

### **Home.jsx: Landing Page**

**What it shows**:
- Hero section with "Ace Your Tech Interviews" title
- 3 Feature cards (Real Questions, AI Feedback, Track Progress)
- Call-to-action buttons
- Project stats (45+ questions, 6 tech stacks, AI feedback)

**Key component**:
```javascript
<Link to="/interviews" className="btn-primary">
  Start Practicing Free
</Link>
```
- `<Link>`: React Router component for navigation (no page reload)
- Clicking this takes user to `/interviews` page

---

### **InterviewSelect.jsx: Tech Stack Selection**

**What it does**:
- Shows buttons for each tech stack: MERN, Node, Java, React, JavaScript, Python
- User clicks one to start interview

**Code concept**:
```javascript
const handleSelectTechStack = (stack) => {
  navigate(`/interview/${stack}`);  // Goes to /interview/mern
};
```

---

### **Interview.jsx: Main Interview Component**

This is the heart of the application. Here's how it works:

#### **State Management**:
```javascript
const [questions, setQuestions] = useState([]);        // Array of questions
const [currentIndex, setCurrentIndex] = useState(0);   // Current question index
const [answer, setAnswer] = useState('');              // User's typed answer
const [feedbackData, setFeedbackData] = useState(null); // AI feedback
const [interviewId, setInterviewId] = useState(null);  // Interview session ID
const [answeredCount, setAnsweredCount] = useState(0); // Track answers submitted
```

#### **Initial Load (useEffect)**:
```javascript
useEffect(() => {
  const init = async () => {
    // Step 1: Fetch questions for selected tech stack
    const questionsRes = await axios.get(
      `http://localhost:8080/api/questions?techStack=${techStack}`
    );
    setQuestions(questionsRes.data);

    // Step 2: Start new interview session
    const interviewRes = await axios.post(
      `http://localhost:8080/api/interviews/start`,
      { techStack }
    );
    setInterviewId(interviewRes.data.interviewId);
  };
  init();
}, [techStack]); // Runs when component mounts or techStack changes
```

#### **Submit Answer**:
```javascript
const handleSubmitAnswer = async () => {
  // Step 1: Send answer to backend for AI feedback
  const res = await axios.post(
    `http://localhost:8080/api/feedback`,
    {
      question: questions[currentIndex].question,
      answer: answer.trim(),
      techStack,
      interviewId,
      questionId: questions[currentIndex]._id
    }
  );
  
  // Step 2: Display feedback
  setFeedbackData(res.data);
  setAnsweredCount(prev => prev + 1);
};
```

#### **Navigate Between Questions**:
```javascript
const handleNextQuestion = () => {
  if (currentIndex < questions.length - 1) {
    setCurrentIndex(prev => prev + 1);
    setAnswer('');           // Clear textarea
    setFeedbackData(null);   // Clear feedback
  }
};

const handlePrevQuestion = () => {
  if (currentIndex > 0) {
    setCurrentIndex(prev => prev - 1);
    // Same cleanup...
  }
};
```

#### **Finish Interview**:
```javascript
const handleFinishInterview = async () => {
  // Mark interview as completed in backend
  await axios.put(`http://localhost:8080/api/interviews/complete/${interviewId}`);
  
  // Navigate to results page
  navigate(`/results/${interviewId}`);
};
```

#### **UI Elements**:
```javascript
{/* Progress Bar */}
<div className="progress-fill" style={{ width: `${progress}%` }}></div>

{/* Current Question */}
<h2>{questions[currentIndex].question}</h2>

{/* User Input Area */}
<textarea
  value={answer}
  onChange={(e) => setAnswer(e.target.value)}
  placeholder="Type your answer..."
/>

{/* Submit Button */}
<button onClick={handleSubmitAnswer} disabled={isLoading}>
  Submit Answer
</button>

{/* Display AI Feedback */}
{feedbackData && (
  <div className="feedback-panel">
    <h3>AI Feedback</h3>
    <div className="score">{feedbackData.score}/10</div>
    <div className="feedback">{feedbackData.feedback}</div>
  </div>
)}

{/* Navigation */}
<button onClick={handlePrevQuestion} disabled={currentIndex === 0}>
  Previous
</button>
<button onClick={handleNextQuestion}>
  Next
</button>
```

---

### **Results.jsx: Interview Review**

**What it does**:
- Displays overall score (average of all question scores)
- Shows detailed breakdown of each answered question
- Lets user expand each question to see:
  - Their answer
  - AI feedback they received
  - Individual score

**Key features**:
```javascript
// Fetch interview data
useEffect(() => {
  const res = await axios.get(
    `http://localhost:8080/api/interviews/${interviewId}`
  );
  setInterview(res.data);
}, [interviewId]);

// Display each response
{interview.responses.map((response, index) => (
  <div key={index} onClick={() => setExpandedIndex(index)}>
    <h4>{response.questionText}</h4>
    <div className="score">{response.score}/10</div>
    
    {/* Show details when expanded */}
    {expandedIndex === index && (
      <div>
        <p>Your Answer: {response.answer}</p>
        <p>Feedback: {response.feedback}</p>
      </div>
    )}
  </div>
))}
```

**Score grading system**:
```
9-10: Excellent
7-8: Good
5-6: Average
3-4: Needs Work
1-2: Poor
```

---

### **NavBar.jsx: Navigation**

Simple component that appears on every page with links to:
- Home
- Start Interview
- (Maybe) About

---

## Database Schema

### **Visual Representation**

```
┌─────────────────────────────────┐
│         Questions               │ (Pre-populated)
├─────────────────────────────────┤
│ _id: ObjectId                   │
│ question: "What is React?"      │
│ techStack: "react"              │
│ difficulty: "medium"            │
│ createdAt: Date                 │
│ updatedAt: Date                 │
└─────────────────────────────────┘
           │ Referenced
           │ (via questionId)
           │
┌─────────────────────────────────────────────────┐
│            Interviews (Sessions)                │
├─────────────────────────────────────────────────┤
│ _id: ObjectId                                   │
│ techStack: "react"                              │
│ status: "completed"                             │
│ overallScore: 7                                 │
│ responses: [                                    │
│   {                                             │
│     questionId: ObjectId → Questions._id        │
│     questionText: "What is React?"              │
│     answer: "React is..."                       │
│     feedback: "**Score: 7/10**...",             │
│     score: 7                                    │
│   },                                            │
│   { ... more responses }                        │
│ ]                                               │
│ createdAt: Date                                 │
│ updatedAt: Date                                 │
└─────────────────────────────────────────────────┘
```

### **Database Operations**

**Create (INSERT)**:
```javascript
// New interview session
new InterviewModel({
  techStack: "mern",
  responses: [],
  status: "in-progress"
}).save();
```

**Read (SELECT)**:
```javascript
// Get questions for a tech stack
QuestionModel.find({ techStack: "mern" });

// Get a specific interview
InterviewModel.findById("507f3d88...");
```

**Update (UPDATE)**:
```javascript
// Add response to interview
InterviewModel.findByIdAndUpdate(
  "507f3d88...",
  {
    $push: {
      responses: {
        questionId: "507f1f77...",
        questionText: "What is React?",
        answer: "...",
        feedback: "...",
        score: 7
      }
    }
  },
  { new: true }
);

// Complete interview
InterviewModel.findByIdAndUpdate(
  "507f3d88...",
  {
    status: "completed",
    overallScore: 7  // Calculated average
  }
);
```

---

## API Endpoints

### **Complete API Reference**

#### **Questions API**

| Method | Endpoint | Purpose | Request | Response |
|--------|----------|---------|---------|----------|
| GET | `/api/questions` | Get questions | `?techStack=mern&difficulty=medium` | Array of questions |
| POST | `/api/questions` | Add question | `{question, techStack, difficulty}` | Newly created question |

---

#### **Interviews API**

| Method | Endpoint | Purpose | Request | Response |
|--------|----------|---------|---------|----------|
| POST | `/api/interviews/start` | Start interview | `{techStack}` | `{interviewId: "..."}` |
| GET | `/api/interviews/:id` | Get interview | - | Full interview object |
| PUT | `/api/interviews/complete/:id` | Complete interview | - | Updated interview |

---

#### **Feedback API**

| Method | Endpoint | Purpose | Request | Response |
|--------|----------|---------|---------|----------|
| POST | `/api/feedback` | Submit answer & get feedback | `{question, answer, techStack, interviewId, questionId}` | `{feedback: "...", score: 7}` |

---

### **Example API Calls (using curl or Postman)**

```bash
# 1. Start interview
curl -X POST http://localhost:8080/api/interviews/start \
  -H "Content-Type: application/json" \
  -d '{"techStack":"mern"}'

Response:
{
  "interviewId": "507f3d88bcf86cd799439012",
  "message": "Interview started"
}

# 2. Get questions
curl http://localhost:8080/api/questions?techStack=mern

Response:
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "question": "What is React?",
    "techStack": "mern",
    "difficulty": "medium"
  },
  ...
]

# 3. Submit answer and get feedback
curl -X POST http://localhost:8080/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is React?",
    "answer": "React is a JavaScript library for building user interfaces",
    "techStack": "mern",
    "interviewId": "507f3d88bcf86cd799439012",
    "questionId": "507f1f77bcf86cd799439011"
  }'

Response:
{
  "feedback": "**Score: 8/10**\n\n**Subject Matter Expertise (8/10):**\nYou demonstrated solid...",
  "score": 8
}

# 4. Complete interview
curl -X PUT http://localhost:8080/api/interviews/complete/507f3d88bcf86cd799439012

Response:
{
  "_id": "507f3d88bcf86cd799439012",
  "techStack": "mern",
  "status": "completed",
  "overallScore": 7,
  "responses": [...],
  "createdAt": "2024-03-20T10:35:00Z",
  "updatedAt": "2024-03-20T10:45:00Z"
}
```

---

## How Features Work

### **Feature 1: Question Bank**

**File**: `backend/seed.js`

**How it works**:
1. Script pre-populates MongoDB with interview questions
2. Each question tagged with techStack (mern, node, java, etc)
3. Each question has difficulty level (easy, medium, hard)
4. When user starts interview, we fetch questions by techStack

**Why pre-population?**:
- No need for UI to add questions
- Consistent quality
- Fast to deploy

---

### **Feature 2: AI Feedback System**

**Files**: 
- `backend/services/groq.service.js`
- `backend/routes/feedback.routes.js`

**How it works**:

```
1. User submits answer
   ↓
2. Backend receives POST /api/feedback
   ├─ Question: "What is React?"
   ├─ Answer: "React is a JavaScript library..."
   └─ TechStack: "react"
   ↓
3. Backend calls Groq AI service with carefully crafted prompt
   ├─ Prompt includes: question, answer, evaluation criteria
   ├─ Model: Mixtral-8x7b-32768 (fast, smart)
   └─ API Key: From environment variable (GROQ_API_KEY)
   ↓
4. Groq AI responds with structured feedback:
   ├─ Score: 7/10
   ├─ Subject Matter Expertise: 7/10
   ├─ Communication Skills: 7/10
   ├─ Strengths: [list]
   ├─ Areas for Improvement: [list]
   └─ Ideal Answer Summary: [summary]
   ↓
5. Backend extracts score from response
   ├─ Uses regex: /Score:\s*(\d+)/i
   ├─ Ensures score is between 1-10
   └─ Returns to frontend
   ↓
6. Backend saves response to MongoDB Interview document
   ├─ Stores: question, answer, feedback, score
   └─ Tied to: interviewId
   ↓
7. Frontend displays feedback to user
```

**Why this approach?**:
- **Instant feedback**: No human grading needed
- **Consistent**: AI applies same criteria to all answers
- **Detailed**: Scores multiple aspects (technical, communication)
- **Fair**: Based on predefined rubric in prompt
- **Scalable**: Can handle unlimited interviews

**Groq advantages over ChatGPT/Claude**:
- **Faster**: Returns responses in 2-5 seconds
- **Cheaper**: Free tier available
- **Open-source model**: Uses Mixtral, no vendor lock-in
- **Real-time friendly**: Perfect for interactive interviews

---

### **Feature 3: Progress Tracking**

**Files**: 
- `backend/models/Interview.model.js`
- `frontend/pages/Results.jsx`

**How it works**:

1. **During Interview**:
   - Each response stored in Interview.responses array
   - Interview.status = "in-progress"

2. **When Finished**:
   - Calculate overall score: average of all response scores
   - Update Interview.status = "completed"
   - Save Interview document

3. **On Results Page**:
   - Fetch Interview by ID
   - Display overall score
   - Show each question with its score
   - Show detailed feedback for each answer

**Data stored for history**:
```javascript
{
  questionText: "...",  // What was asked
  answer: "...",        // What user answered
  feedback: "...",      // What AI said
  score: 7              // Score received
}
```

**Benefits**:
- Users can review past answers
- Track improvement over time
- Identify weak areas
- Build confidence

---

### **Feature 4: Multiple Tech Stacks**

**Supported Stacks**:
- **MERN**: MongoDB, Express, React, Node.js (Full stack)
- **Node**: Backend JavaScript
- **Java**: General Java development
- **React**: Frontend framework
- **JavaScript**: Core language
- **Python**: General purpose language

**How questions are organized**:
```javascript
const filter = { techStack: "mern" };
const questions = QuestionModel.find(filter);
// Returns all questions tagged with "mern"
```

**Why multiple stacks?**:
- Serves different developer profiles
- Interviews vary by specialization
- Users can practice multiple areas
- See strengths/weaknesses in different stacks

---

## Setup Instructions

### **Prerequisites**
- Node.js (v16+)
- MongoDB (local or Atlas cloud)
- Groq API Key (free from groq.com)

### **Step 1: Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Create .env file with:
MONGODB_URI=mongodb://localhost:27017/interviewace
GROQ_API_KEY=your_key_here
PORT=8080

# Seed database with questions
npm run seed

# Start backend
npm run dev
```

Expected output:
```
MongoDB connected: localhost
Server running on http://localhost:8080
```

### **Step 2: Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Expected output:
```
VITE v8.0.1  ready in XXX ms

Local: http://localhost:5173/
```

### **Step 3: Test Application**

1. Open http://localhost:5173 in browser
2. Click "Start Practicing"
3. Select a tech stack
4. Answer a question
5. See AI feedback appear
6. Review results

---

## Deployment Notes

### **Backend Deployment**

**Use Render, Railway, or Heroku**

Steps:
1. Push code to GitHub
2. Connect repository to deployment service
3. Set environment variables:
   - `MONGODB_URI`: MongoDB Atlas URI
   - `GROQ_API_KEY`: Your Groq key
   - `PORT`: 8080 (default)
4. Deploy

**Example on Render**:
```
1. Connect GitHub repo
2. Select "Node" environment
3. Build: npm install
4. Start: npm run start
5. Add environment variables in Dashboard
6. Deploy
```

### **Frontend Deployment**

**Use Vercel, Netlify, or similar**

Steps:
1. Push code to GitHub
2. Connect repository to deployment service
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set API base URL to production backend

**Important**: Update `API_BASE` in `Interview.jsx`:
```javascript
// Before deployment, change:
const API_BASE = 'http://localhost:8080/api';
// To production URL:
const API_BASE = 'https://your-backend.onrender.com/api';
```

### **Database Deployment**

**Use MongoDB Atlas (cloud)**

Steps:
1. Create free account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to backend `.env`:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/interviewace
   ```

### **Full Stack Deployment Example**

```
Frontend (Vercel) → https://interviewace.vercel.app
                         ↓
Backend (Render)  → https://interviewace-api.onrender.com
                         ↓
Database (MongoDB Atlas) → mongodb+srv://...
                         ↓
AI (Groq Cloud)  → API via environment variable
```

---

## Monitoring & Maintenance

### **Backend Logs**

Monitor:
- MongoDB connection status
- Groq API calls
- Request errors
- Response times

### **Frontend Errors**

Check:
- Browser console for JavaScript errors
- Network tab for failed API calls
- Loading states
- Error boundaries

### **Performance Optimization**

- **Cache questions**: Don't refetch on every interview
- **Lazy load feedback**: Don't render all at once on results
- **Debounce textarea input**: Reduce state updates
- **Optimize AI prompts**: Shorter prompts = faster responses

---

## Troubleshooting

### **Common Issues**

**Q: "CORS error: Access-Control-Allow-Origin"**
- A: CORS middleware not enabled. Check `app.use(cors())` in backend

**Q: "MongoDB connection timeout"**
- A: Connection string wrong or database not running. Check `MONGODB_URI`

**Q: "Groq API 401 Unauthorized"**
- A: API key invalid or expired. Check `GROQ_API_KEY`

**Q: "Questions not loading"**
- A: Run `npm run seed` to populate database with sample questions

**Q: "Feedback taking too long"**
- A: Normal (2-5 sec). Check Groq API status. Add loading indicator.

**Q: "Blank feedback despite high score"**
- A: Frontend parsing issue. Check `renderFeedback()` function in Interview.jsx

---

## Summary: Complete Data Journey

```
START: User opens app
  ↓
[Home Page] User clicks "Start Practicing"
  ↓
[Tech Stack Selection] User selects "MERN"
  ↓
[Backend] POST /interviews/start → Creates new Interview in MongoDB
  ↓
[Backend] GET /questions?techStack=mern → Fetches questions
  ↓
[Interview Page] Questions displayed to user
  ↓
[User] Types answer and clicks "Submit"
  ↓
[Backend] POST /feedback
  ├─ Question: "What is React?"
  ├─ Answer: "React is..."
  ├─ TechStack: "mern"
  └─ InterviewId: "507f3d88..."
  ↓
[Backend] Calls Groq AI service
  ├─ Sends: question + answer + context
  ├─ Receives: structured feedback + score
  └─ Extracts: "Score: 7/10"
  ↓
[Backend] Saves response to Interview in MongoDB
  ├─ Stores: questionText, answer, feedback, score
  └─ Pushes to: Interview.responses array
  ↓
[Frontend] Displays feedback
  ├─ Shows score: 7/10
  ├─ Shows: Subject Matter Expertise
  ├─ Shows: Strengths & Areas for Improvement
  └─ Shows: Ideal Answer Summary
  ↓
[User] Continues to next question (repeats above)
  ↓
[User] After all questions, clicks "Finish"
  ↓
[Backend] PUT /interviews/complete/:id
  ├─ Calculates: average score = sum / count
  ├─ Updates: Interview.status = "completed"
  ├─ Updates: Interview.overallScore = average
  └─ Saves to MongoDB
  ↓
[Results Page] User sees:
  ├─ Overall score with color-coding
  ├─ All questions answered
  ├─ Individual scores for each
  ├─ Full feedback expandable
  └─ Option to start new interview
  ↓
END: User can review anytime by visiting /results/:id
```

---

## Conclusion

InterviewAce is a modern, full-stack web application that combines:
- **Frontend**: React for interactive UI
- **Backend**: Express for business logic
- **Database**: MongoDB for data persistence
- **AI**: Groq for instant, intelligent feedback

The architecture is clean, scalable, and uses industry-standard technologies. Each component has a specific responsibility, making the code maintainable and easy to understand.

**Key Takeaway**: The app follows the MVC (Model-View-Controller) pattern:
- **Models** (Question, Interview): Data structure
- **Views** (React components): What users see
- **Controllers** (Routes): Logic tying it together

Welcome to InterviewAce!

