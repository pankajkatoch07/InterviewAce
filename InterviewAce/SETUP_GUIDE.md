# InterviewAce - Setup & Run Guide

Complete instructions to get InterviewAce running locally.

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org)
- **MongoDB** (v4.0+) - [Download](https://www.mongodb.com/try/download/community)
- **Groq API Key** - [Get one here](https://console.groq.com) (FREE - takes 2 minutes)

## IMPORTANT: Configure Groq API Key First

Before running the backend, you **MUST** set up a valid Groq API key:

1. Go to https://console.groq.com/keys
2. Create a new API key
3. Open `backend/.env` and replace:
   ```
   GROQ_API_KEY=YOUR_ACTUAL_GROQ_API_KEY_HERE
   ```
   with your actual key (looks like: `gsk_xxxxx...`)

👉 [Detailed instructions](./GET_GROQ_API_KEY.md)

## Quick Start (3 Steps)

### Step 1: Start MongoDB

**Windows:**
```bash
mongod
```

Or if MongoDB is installed as a service, it should start automatically.

**Mac/Linux:**
```bash
brew services start mongodb-community
# or
mongod
```

### Step 2: Start Backend Server

```bash
cd backend
npm install  # (only needed first time)
npm run dev
```

Expected output:
```
> interviewace-backend@1.0.0 dev
> nodemon index.js

Using Groq model: llama-3.1-8b-instant
MongoDB connected: localhost
Server running on http://localhost:5000
```

✅ If you see "Using Groq model:" - your API key is working! If you see an error, see [Troubleshooting](#troubleshooting)

### Step 3: Start Frontend Server

Open a new terminal in the project root:

```bash
cd frontend
npm install  # (only needed first time)
npm run dev
```

You'll see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173
```

## Access the Application

Open your browser and go to: **http://localhost:5173**

## (Optional) Seed Database with Sample Questions

To populate the database with sample interview questions, run:

```bash
cd backend
npm run seed
```

This will add 45+ questions across 6 tech stacks:
- MERN Stack
- Node.js
- Java
- React
- JavaScript
- Python

## Configuration

### Backend Configuration (.env)

The backend uses these settings (already configured):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interviewace
GROQ_API_KEY=your_api_key_here
```

**Note:** If you want to use your own Groq API key, update `GROQ_API_KEY` in `backend/.env`

### Frontend Configuration

API endpoint is configured in:
- `frontend/src/pages/Interview.jsx` → `API_BASE = 'http://localhost:5000/api'`
- `frontend/src/pages/Results.jsx` → `API_BASE = 'http://localhost:5000/api'`

## Troubleshooting

### Port Already in Use

If you get `EADDRINUSE: address already in use :::5000`:

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error

Make sure MongoDB is running:
```bash
# Test connection
mongosh
# or
mongo
```

### API Calls Failing

1. Check the browser console (F12)
2. Ensure backend is running on port 5000
3. Verify MongoDB is connected

### Groq API Key Issues

**Error: "model_not_found" or "does not exist"**
- Your API key is invalid or expired
- Get a new one: https://console.groq.com/keys
- Update `GROQ_API_KEY` in `backend/.env`

**Error: "The model has been decommissioned"**
- Change the model in `backend/.env`:
  ```
  GROQ_MODEL=llama-3.1-8b-instant
  ```
- Or try: `mixtral-8x7b-32768` or `llama-3.1-70b-versatile`
- See [GET_GROQ_API_KEY.md](./GET_GROQ_API_KEY.md) for available models

**Error: "model_decommissioned"**
- Same as above - use a different model
- Check https://console.groq.com/docs/models for current models

**Feedback not generating at all:**
1. Check backend logs for error messages
2. Verify API key is in `backend/.env`
3. Make sure there are no extra spaces in the API key
4. Restart backend with `npm run dev`

## Available Commands

### Backend
- `npm start` - Run in production mode
- `npm run dev` - Run in development mode with auto-reload
- `npm run seed` - Populate database with sample questions

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Check code quality

## How It Works

1. **Select Tech Stack** → Choose from MERN, Node.js, Java, React, JavaScript, or Python
2. **Answer Questions** → Type your answers to interview questions
3. **Get AI Feedback** → Groq AI analyzes your answer and provides:
   - Overall score (1-10)
   - Subject matter expertise rating
   - Communication skills rating
   - Strengths identified
   - Areas for improvement
4. **View Results** → See all your answers and feedback in one place
5. **Track Progress** → Retake interviews to improve your score

## Need Help?

- Check the [main README](./README.md) for project overview
- See [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) for technical details
- Check GitHub issues or create a new one

---

**Happy Interviewing! 🚀**
