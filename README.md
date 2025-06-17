# SalesPilot AI

An AI-powered sales assistant that generates cold emails and follow-up sequences to help businesses scale their outreach.

## Features
- AI cold email generator using OpenAI GPT-4
- Simple frontend form
- Ready-to-use backend (FastAPI)
- Pitch deck and email sequences for sales

## How to Run Locally

1. Install dependencies:
```
pip install -r requirements.txt
```

2. Set your OpenAI API Key:
Create a `.env` file in the root:
```
OPENAI_API_KEY=your_openai_key_here
```

3. Start the server:
```
uvicorn backend.main:app --reload
```

4. Open `frontend/index.html` in your browser.

## Deployment

- Backend: Render (recommended)
- Frontend: Vercel or Netlify
