# CEP Platform - Full Integrated Starter

Features included:
- Frontend: React + Vite + Tailwind
- Backend: Express + MongoDB + Passport (Local) with sessions
- Pages: Home, Lessons, Quiz, Scholarships, Games
- Protected routes: All main pages require login (session-based)

## Quick start
1. Copy `.env.example` to `server/.env` and set `MONGO_URI` and `SESSION_SECRET`.
2. Install and run server:
   ```bash
   cd server
   npm install
   npm run dev
   ```
3. Install and run client:
   ```bash
   cd client
   npm install
   npm run dev
   ```
4. Seed sample data (optional):
   ```bash
   node server/scripts/seedQuestions.js
   node server/scripts/seedLessons.js
   node server/scripts/seedScholarships.js
   ```

Login/register flow: 
- Visit http://localhost:3000 -> you'll be sent to /login
- Register a new account -> you'll be redirected to /home and navbar becomes visible

Enjoy!
