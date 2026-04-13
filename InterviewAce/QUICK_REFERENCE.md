# InterviewAce - Complete Setup

**Status: ✅ Fully Configured & Working**

This document summarizes the complete setup for InterviewAce.

## Quick Start (5 minutes)

### 1. Get Groq API Key
- Visit: https://console.groq.com/keys
- Create new API key
- Copy the key immediately

### 2. Configure `backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interviewace
GROQ_API_KEY=gsk_your_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

### 3. Start MongoDB
```bash
mongod
```

### 4. Start Backend
```bash
cd backend
npm install
npm run dev
```

### 5. Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

### 6. Open Browser
**http://localhost:5173**

---

## Project Configuration

### Backend (.env)
- **PORT**: 5000
- **MONGODB_URI**: mongodb://localhost:27017/interviewace
- **GROQ_API_KEY**: Your API key (get from https://console.groq.com)
- **GROQ_MODEL**: llama-3.1-8b-instant (current working model)

### Frontend (.env)
- **VITE_API_BASE**: http://localhost:5000/api

---

## File Structure

```
InterviewAce/
├── backend/              # Node.js + Express backend
│   ├── index.js
│   ├── package.json
│   ├── .env              # ⚠️ Keep private, don't commit
│   ├── .env.example      # Template only
│   ├── seed.js
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── services/
│
├── frontend/             # React + Vite frontend
│   ├── package.json
│   ├── .env
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│
├── README.md            # Project overview
├── PROJECT_DOCUMENTATION.md  # Technical details
└── SETUP_GUIDE.md       # Setup instructions
```

---

## Key Technologies

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 19.2.4 |
| Frontend Build | Vite | 8.0.1 |
| Backend | Express | 4.21.0 |
| Database | MongoDB | 8.5.0 |
| ODM | Mongoose | 8.5.0 |
| AI | Groq SDK | Latest |

---

## Running Commands

### Backend
```bash
npm start              # Production
npm run dev            # Development (with auto-reload)
npm run seed           # Add sample questions
```

### Frontend
```bash
npm run dev            # Development server
npm run build          # Production build
npm run lint           # Code quality check
```

---

## Common Issues & Solutions

### "EADDRINUSE: address already in use"
Port 5000 is already in use.
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### "MongoDB connection error"
MongoDB is not running.
```bash
mongod
```

### "Model decommissioned"
Groq API deprecated the model. Update `GROQ_MODEL` in `backend/.env`:
https://console.groq.com/docs/models

### "Invalid API Key"
- Check API key has no extra spaces
- Verify entire key is copied
- Try creating a new key in Groq console

---

## Optional: Seed Database

Add 45+ interview questions:
```bash
cd backend
npm run seed
```

Adds questions for 6 tech stacks:
- MERN Stack
- Node.js
- Java
- React
- JavaScript
- Python

---

## Next Steps

### For Development
1. Review [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) for architecture
2. Check backend routes in `backend/routes/`
3. Check frontend pages in `frontend/src/pages/`

### For Deployment
*Discussion scheduled for later*

---

## Support Resources

- **Groq Models**: https://console.groq.com/docs/models
- **React Docs**: https://react.dev
- **Express Guide**: https://expressjs.com
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas

---

**InterviewAce is ready for use! **
