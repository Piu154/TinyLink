🧩 TinyLink – URL Shortener

A simple Bit.ly–style web app where users can shorten URLs, view stats, and manage links.
Built using React (Vite) for frontend and Express + PostgreSQL (Neon) for backend.

🚀 Live Demo
Item	URL
Live App (Netlify)	https://tinnylinkk.netlify.app/

API Base URL (Render[)	https://tinylink-a8gs.onrender.com
🛠 Tech Stack
Frontend

React + Vite

Tailwind CSS

Axios

Netlify Hosting

Backend

Node.js

Express

PostgreSQL (Neon)

pg library

Render Hosting

🔗 Core Features

Create short URLs

Optional custom shortcode

Redirect /code → original URL

Click counter

Last-clicked timestamp

Delete links

Dashboard listing all links

Stats page for each link

Health check endpoint

Validations + duplicate shortcode error

Fully deployed frontend + backend

📡 API Endpoints
POST /api/links

Create a short link.

GET /api/links

List all links.

GET /api/links/:code

Get stats for one link.

DELETE /api/links/:code

Delete a link.

GET /:code

Redirect to original URL + increments click count.

GET /healthz

Health check.

🔐 Environment Variables

Create a .env file:

DATABASE_URL=YOUR_NEON_DB_URL
BASE_URL=https://your-render-domain
PORT=5000

🏃 How to Run Locally
Backend
cd server
npm install
npm run dev


Runs on: http://localhost:5000

Frontend
cd client
npm install
npm run dev


Open: http://localhost:5173
