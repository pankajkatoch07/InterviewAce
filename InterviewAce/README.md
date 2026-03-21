# InterviewAce

**Status**: ✅ Fully Configured & Working

An AI-powered interview prep platform helping engineers practice technical interviews with instant, intelligent feedback. Supports multiple tech stacks, tracks progress, and provides detailed performance metrics.

## ✨ Features

- **AI-Powered Feedback** - Get instant, detailed feedback on your interview answers using Groq AI
- **Multiple Tech Stacks** - Practice questions for 6 different tech stacks (MERN, Node.js, Java, React, JavaScript, Python)
- **Real-Time Analysis** - Receive structured feedback including technical expertise, communication skills, strengths, and areas to improve
- **Progress Tracking** - Store and review all past interview sessions with individual scores
- **Performance Metrics** - Track your improvement over time with detailed performance analytics

## 🛠 Tech Stack

### Frontend
- **React 19.2.4** - UI Framework
- **React Router 7.13.1** - Client-side routing
- **Axios 1.13.6** - HTTP client for API calls
- **Vite 8.0.1** - Build tool & dev server
- **React Icons 5.6.0** - Icon library

### Backend
- **Node.js + Express 4.21.0** - Server framework
- **MongoDB 8.5.0** - NoSQL database
- **Mongoose 8.5.0** - MongoDB object mapper
- **Groq SDK** - AI inference service
- **Llama 3.1 8B Instant** - AI model for feedback generation

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Quick start (5 minutes) |
| [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) | Technical details & architecture |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Common commands & troubleshooting |
| [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md) | Project status & next steps |

## 📁 Project Structure

```
InterviewAce/
├── backend/
│   ├── index.js                    # Server entry point
│   ├── package.json
│   ├── seed.js                     # Database seeding
│   ├── .env                        # Configuration (API key, model, port)
│   ├── .env.example                # Configuration template
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── models/
│   │   ├── Interview.model.js      # Interview session schema
│   │   └── Question.model.js       # Interview questions schema
│   ├── routes/
│   │   ├── feedback.routes.js      # AI feedback endpoint
│   │   ├── interview.routes.js     # Interview session endpoints
│   │   └── question.routes.js      # Question retrieval endpoints
│   └── services/
│       └── groq.service.js         # Groq AI integration
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── .env                        # Frontend config
    ├── src/
    │   ├── App.jsx                 # Main app component
    │   ├── main.jsx                # Entry point
    │   ├── components/
    │   │   └── NavBar.jsx          # Navigation bar
    │   └── pages/
    │       ├── Home.jsx            # Landing page
    │       ├── InterviewSelect.jsx  # Tech stack selection
    │       ├── Interview.jsx       # Interview interface
    │       └── Results.jsx         # Results & feedback display
    └── public/
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14+) - [Download](https://nodejs.org)
- **MongoDB** (v4.0+) - [Download](https://www.mongodb.com/try/download/community)
- **Groq API Key** (FREE) - [Get here](https://console.groq.com/keys)

### Setup (3 steps)

**1. Configure Environment**

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interviewace
GROQ_API_KEY=your_actual_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

**2. Start Backend**
```bash
cd backend
npm install
npm run dev
```

Expected output:
```
Using Groq model: llama-3.1-8b-instant
MongoDB connected: localhost
Server running on http://localhost:5000
```

**3. Start Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser 🎉

## 📝 Available Commands

### Backend
```bash
npm start              # Production mode
npm run dev            # Development with auto-reload
npm run seed           # Populate database with sample questions
```

### Frontend
```bash
npm run dev            # Development server
npm run build          # Production build
npm run lint           # Code quality check
```

## 🎯 How It Works

1. **Select Tech Stack** - Choose from 6 different tech stacks
2. **Answer Questions** - Read and type your answer to interview questions
3. **Get AI Feedback** - Groq AI analyzes your answer and provides:
   - Overall score (1-10)
   - Technical expertise rating
   - Communication skills rating
   - Key strengths identified
   - Areas for improvement
   - Ideal answer summary
4. **Review Results** - View all feedback and track your progress

## 🔧 Configuration

### Groq Model
If you encounter a "decommissioned model" error, update `GROQ_MODEL` in `backend/.env` to one from:
https://console.groq.com/docs/models

Examples: `llama-3.1-8b-instant`, `mixtral-8x7b-32768`, `llama2-70b-4096`

### Database
- **Local MongoDB**: Uses `mongodb://localhost:27017/interviewace` by default
- **MongoDB Atlas**: Update `MONGODB_URI` in `.env` with your connection string

## 📚 Additional Resources

- [Project Documentation](./PROJECT_DOCUMENTATION.md) - Detailed technical documentation
- Groq API Docs - https://console.groq.com/docs
- React Docs - https://react.dev
- Express Docs - https://expressjs.com

## 📄 License

ISC

---

**Questions or issues?** Check PROJECT_DOCUMENTATION.md for more details.
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
