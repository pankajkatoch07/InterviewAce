# InterviewAce

An AI-powered interview prep platform helping engineers practice technical interviews with instant, intelligent feedback. Supports multiple tech stacks, tracks progress, and provides detailed performance metrics.

##  Features

- **AI-Powered Feedback**: Get instant, detailed feedback on your interview answers using Groq AI
- **Multiple Tech Stacks**: Practice questions for 6 different tech stacks (MERN, Python, Java, etc.)
- **Progress Tracking**: Store and review all past interview sessions with individual scores
- **Real-Time Analysis**: Receive structured feedback including strengths and areas to improve
- **Performance Metrics**: Track your improvement over time with detailed performance analytics
- **Persistent Sessions**: Review previous interviews and track your growth

## Tech Stack

### Frontend
- **React 19.2.4** - UI Framework
- **React Router 7.13.1** - Client-side routing
- **Axios 1.13.6** - HTTP client for API calls
- **Vite 8.0.1** - Fast build tool
- **React Icons 5.6.0** - Icon library
- **ESLint 9.39.4** - Code quality tool

### Backend
- **Node.js + Express 4.21.0** - Server framework
- **MongoDB 8.5.0** - NoSQL database
- **Mongoose 8.5.0** - MongoDB object mapper
- **Groq SDK 0.4.2** - AI inference service
- **Mixtral-8x7b-32768** - AI model for feedback generation

##  Project Structure

```
InterviewAce/
├── backend/
│   ├── index.js              # Server entry point
│   ├── package.json
│   ├── seed.js               # Database seeding
│   ├── config/
│   │   └── db.js             # Database configuration
│   ├── models/
│   │   ├── Interview.model.js
│   │   └── Question.model.js
│   ├── routes/
│   │   ├── feedback.routes.js
│   │   ├── interview.routes.js
│   │   └── question.routes.js
│   └── services/
│       └── groq.service.js   # AI feedback service
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── components/
    │   │   └── NavBar.jsx
    │   └── pages/
    │       ├── Home.jsx
    │       ├── Interview.jsx
    │       ├── InterviewSelect.jsx
    │       └── Results.jsx
    └── public/
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Groq API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your configuration:
```
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

4. Seed the database (optional):
```bash
npm run seed
```

5. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

##  How It Works

1. **Select Tech Stack**: Choose from available tech stacks to practice
2. **Get Question**: Receive a curated interview question
3. **Answer**: Type your response to the question
4. **AI Analysis**: Groq AI analyzes your answer and provides:
   - Score (0-100)
   - Strengths
   - Areas for improvement
   - Suggestions
5. **Track Progress**: View all past sessions and monitor your improvement

## API Endpoints

### Questions
- `GET /api/questions` - Fetch questions (with optional tech stack filter)
- `POST /api/questions` - Create a new question

### Interviews
- `GET /api/interviews` - Get all interview sessions
- `POST /api/interviews` - Start a new interview session
- `GET /api/interviews/:id` - Get specific interview details
- `PATCH /api/interviews/:id` - Update interview

### Feedback
- `POST /api/feedback` - Generate AI feedback for an answer

##  Target Audience

- Software engineers preparing for job interviews
- Students learning technical interview skills
- Anyone wanting to practice and track improvement in tech interviews

##  Database Schema

### Question Model
- `question`: String
- `techStack`: String
- `difficulty`: String
- `category`: String
- `expectedAnswer`: String

### Interview Model
- `userId`: String
- `techStack`: String
- `questions`: Array of question IDs
- `answers`: Array of user answers
- `feedbacks`: Array of AI feedback
- `scores`: Array of individual scores
- `totalScore`: Number
- `date`: Date

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Created for interview preparation 

---

**For detailed project documentation, see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)**
