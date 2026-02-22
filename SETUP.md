# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Backend Setup
```powershell
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Start backend
uvicorn app.main:app --reload
```

Backend running at: **http://localhost:8000**

### Step 2: Frontend Setup
Open a **new terminal**:

```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
copy .env.local.example .env.local

# Start frontend
npm run dev
```

Frontend running at: **http://localhost:3000**

### Step 3: Verify Setup
1. Open browser: http://localhost:3000
2. Check for green "Backend Connected" status
3. View API docs: http://localhost:8000/docs

## ✅ What You Should See

### Frontend (http://localhost:3000)
- ✅ AI Learning Assistant title
- ✅ Green "Backend Connected" badge
- ✅ 6 feature cards (all "Coming Soon")
- ✅ Tech stack badges

### Backend (http://localhost:8000/docs)
- ✅ Swagger UI documentation
- ✅ Health endpoint: GET /api/health
- ✅ Try it out → Execute → Response 200

## 🐛 Common Issues

**Issue:** Backend won't start
- **Solution:** Check if Python 3.10+ is installed: `python --version`

**Issue:** "ModuleNotFoundError"
- **Solution:** Activate venv: `.\venv\Scripts\activate`

**Issue:** Frontend shows "Failed to connect"
- **Solution:** Make sure backend is running on port 8000

**Issue:** Database error
- **Solution:** Verify .env has correct DATABASE_URL

## 📦 Clean Architecture Summary

```
✅ Backend: FastAPI + SQLAlchemy + Pydantic
✅ Frontend: Next.js 14 + TypeScript + TailwindCSS
✅ Database: Supabase Postgres + pgvector
✅ Models: Document, Chunk, Chat, Message
✅ Health Check: GET /api/health
✅ CORS: Configured for localhost:3000
```

## 🎯 Phase 1 Complete!

All setup and configuration done. Ready for Phase 2 implementation:
- PDF/YouTube processing
- OpenAI embeddings
- Flashcards & Quizzes
- Chat functionality

---

**Need help?** Check the main README.md for detailed documentation.
