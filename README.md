# Bloompots MERN Stack Application

This project is structured as a MERN stack application with separated frontend and backend code.

## Prerequisites

- **Node.js** (v16+)
- **npm** (v8+)
- **MongoDB** (running locally on port 27017 or configured via `backend/.env`)

## Getting Started

1. **Install all dependencies** for the root orchestrator, frontend, and backend:
   ```bash
   npm run install-all
   ```

2. **Run the application** (starts both frontend Vite server and backend Express server concurrently):
   ```bash
   npm run dev
   ```

## Directory Structure

- `frontend/` - React & Vite SPA
- `backend/` - Node.js Express server connected to MongoDB
