# AI Learning Assistant

A production-ready full-stack AI-powered learning platform with PDF/YouTube processing, flashcards, quizzes, and interactive chat.

## 🏗️ Architecture

This is a **monorepo** setup with clean separation of concerns:

```
ai-learning-assistant/
├── backend/          # FastAPI Python backend
│   ├── app/
│   │   ├── core/     # Configuration and database
│   │   ├── models/   # SQLAlchemy models
│   │   ├── routes/   # API endpoints
│   │   ├── services/ # Business logic (Phase 2)
│   │   └── utils/    # Helper functions (Phase 2)
│   ├── requirements.txt
│   └── .env.example
└── frontend/         # Next.js React frontend
    ├── app/          # Next.js 14 App Router
    ├── components/   # React components
    ├── lib/          # API client and utilities
    ├── types/        # TypeScript definitions
    └── .env.local.example
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first styling

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM with async support
- **Pydantic** - Data validation
- **PostgreSQL** - Database (Supabase)
- **pgvector** - Vector similarity search

### Infrastructure
- **Supabase** - PostgreSQL hosting with pgvector
- **Python 3.10+**
- **Node.js 18+**

## 📦 Installation

### Prerequisites
- Python 3.10 or higher
- Node.js 18 or higher
- PostgreSQL with pgvector (provided by Supabase)

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create and activate virtual environment:**

**Windows:**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment:**
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your actual credentials (already populated in .env.example)
```

5. **Run the backend:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**
- API Documentation: **http://localhost:8000/docs**
- ReDoc: **http://localhost:8000/redoc**
- Health Check: **http://localhost:8000/api/health**

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
# Copy example env file
cp .env.local.example .env.local

# Edit .env.local if needed (default points to localhost:8000)
```

4. **Run the development server:**
```bash
npm run dev
```

Frontend will be available at: **http://localhost:3000**

## 🚀 Quick Start

**Terminal 1 (Backend):**
```bash
cd backend
.\venv\Scripts\activate  # Windows
uvicorn app.main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Visit **http://localhost:3000** and verify the backend connection status is green.

## 📊 Database Schema

The application uses the following schema (already set up in Supabase):

### Tables

**documents**
- `id` (UUID, PK)
- `title` (Text)
- `source_type` (Text) - 'pdf' or 'youtube'
- `created_at` (Timestamp)

**chunks**
- `id` (UUID, PK)
- `document_id` (UUID, FK → documents)
- `content` (Text)
- `embedding` (Vector(1536)) - OpenAI embeddings
- `created_at` (Timestamp)

**chats**
- `id` (UUID, PK)
- `document_id` (UUID, FK → documents)
- `created_at` (Timestamp)

**messages**
- `id` (UUID, PK)
- `chat_id` (UUID, FK → chats)
- `role` (Text) - 'user', 'assistant', 'system'
- `content` (Text)
- `created_at` (Timestamp)

## 🔑 Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://[your-supabase-connection]

# Supabase
SUPABASE_URL=https://[your-project].supabase.co
SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-key]

# OpenAI (Phase 2)
OPENAI_API_KEY=sk-...

# App Config
ENVIRONMENT=development
DEBUG=True
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🧪 Testing Backend

**Test health endpoint:**
```bash
curl http://localhost:8000/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "database": "connected",
  "message": "AI Learning Assistant API is running"
}
```

## 📁 Project Structure Details

### Backend Structure
```
backend/app/
├── core/
│   ├── config.py         # Pydantic settings
│   └── database.py       # SQLAlchemy async engine
├── models/
│   ├── base.py          # Base model class
│   ├── document.py      # Document model
│   ├── chunk.py         # Chunk model with embeddings
│   ├── chat.py          # Chat session model
│   └── message.py       # Chat message model
├── routes/
│   └── health.py        # Health check endpoint
├── services/            # Business logic (Phase 2)
└── utils/              # Helper functions (Phase 2)
```

### Frontend Structure
```
frontend/
├── app/
│   ├── layout.tsx       # Root layout with Navbar
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   └── Navbar.tsx       # Navigation component
├── lib/
│   └── api.ts           # API client
└── types/
    └── index.ts         # TypeScript types
```

## 🎯 Phase 1 Status

✅ **Completed:**
- Backend FastAPI structure
- SQLAlchemy models with relationships
- Database connection (Supabase)
- pgvector integration
- Health check endpoint
- CORS configuration
- Frontend Next.js 14 setup
- TailwindCSS configuration
- API client with error handling
- Basic UI with placeholder cards
- TypeScript types

🚧 **Not Implemented (Future Phases):**
- PDF upload and processing
- YouTube transcript extraction
- OpenAI embeddings generation
- Semantic search with pgvector
- Flashcard generation
- Quiz generation
- Chat functionality
- File upload routes

## 🔧 Development Commands

### Backend
```bash
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn app.main:app --reload

# Run on specific port
uvicorn app.main:app --reload --port 8080

# View logs
# FastAPI logs to console
```

### Frontend
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Backend Issues

**"ModuleNotFoundError: No module named 'app'"**
- Make sure you're in the `backend/` directory
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

**Database connection error**
- Verify DATABASE_URL in `.env` is correct
- Check Supabase project is running
- Ensure Session Pooler URI is used (not Direct Connection)

**CORS errors**
- Verify `BACKEND_CORS_ORIGINS` includes your frontend URL
- Check frontend is running on the correct port (3000)

### Frontend Issues

**"Cannot connect to backend"**
- Ensure backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is configured correctly in backend

**Module not found errors**
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then reinstall

## 📝 API Documentation

Once the backend is running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🚀 Production Deployment

### Backend Deployment (e.g., Railway, Render, Fly.io)
1. Set environment variables in hosting platform
2. Use production DATABASE_URL
3. Set `ENVIRONMENT=production`
4. Set `DEBUG=False`
5. Add production frontend URL to `BACKEND_CORS_ORIGINS`

### Frontend Deployment (Vercel recommended)
1. Connect GitHub repository
2. Set `NEXT_PUBLIC_API_URL` to production backend URL
3. Deploy automatically on push

## 📚 Next Steps (Phase 2)

1. **Document Processing**
   - PDF upload endpoint
   - YouTube URL processing
   - Text extraction and chunking

2. **Embeddings**
   - OpenAI integration
   - Vector generation
   - Similarity search

3. **AI Features**
   - Flashcard generation
   - Quiz generation
   - Chat with RAG

4. **UI Enhancements**
   - Document upload interface
   - Chat interface
   - Flashcard viewer
   - Quiz interface

## 📄 License

Private project - All rights reserved

## 👨‍💻 Author

Built with ❤️ using modern full-stack technologies
