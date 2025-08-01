# InQ – Digital Queue Management System

> A modern, scalable web app for virtual queue management targeting small businesses like clinics, salons, repair shops, and more.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Advanced Features (Future)](#advanced-features-future)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Setup & Development Guide](#setup--development-guide)
- [Docker Setup](#docker-setup)
- [AI & Chat System Ideas](#ai--chat-system-ideas)
- [Map & Nearby Location Integration](#map--nearby-location-integration)
- [7-Day Sprint Plan](#7-day-sprint-plan)
- [Contribution](#contribution)
- [License](#license)

---

## Project Overview

InQ is designed to replace manual and inefficient queue management systems with a **contactless, real-time virtual queue** solution. Customers join queues remotely, receive live updates, and businesses manage customer flow seamlessly.

---

## Core Features

---

## Authentication & Authorization (Backend)

- **User Registration:** `/api/auth/register` (name, email, telephone, password, role)
- **User Login:** `/api/auth/login` (JWT, HTTP-only cookie)
- **Logout:** `/api/auth/logout` (clears session)
- **Protected Routes:** Only accessible to authenticated users (via middleware)
- **Role-Based Access:** Restricts certain actions to roles like `owner` or `admin`
- **Password Security:** All passwords hashed with bcryptjs
- **Validation:** All input validated with validator.js
- **Session Security:** JWT tokens stored in HTTP-only cookies
- **Example Protected Route:** `/api/auth/profile` (returns user info if logged in)
- **Example Role Route:** `/api/auth/shop/add` (only `owner` can add shops)

### Customer

- Register with name, email, telephone, and password
- Log in securely (JWT, HTTP-only cookie)
- Search shops by location or category
- View live queue status and estimated wait time
- Join and cancel queue slots remotely
- Receive queue tokens
- Access protected profile and actions

### Shop Owner (Admin)

- Register and manage shops (CRUD)
- View/manage daily queues per shop
- Update customer statuses: served, skipped, no-show
- Set opening hours and queue capacity
- Role-based access for shop management and queue operations

---

## Advanced Features (Future)

- **AI-powered wait time estimation:** Use historical data to predict accurate wait times.
- **Real-time chat support:** Customers can chat with shop owners for queries.
- **Nearby location suggestions:** Based on geolocation, show nearest shops with queues.
- **Map integration:** Visual map with shops and queue hotspots.
- **SMS / Email notifications:** Alerts when customer is next in queue.
- **Multi-branch support:** Manage multiple shops under one account.
- **Analytics dashboard:** Insights on wait times, no-shows, peak hours.

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB + Mongoose
- **Frontend:** React.js with React Router, Tailwind CSS
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Docker, Render, Vercel
- **Additional Tools:**
  - Socket.io (for real-time updates/chat)
  - Google Maps API or Mapbox (for maps)
  - TensorFlow.js or Python AI service (for wait time prediction)
  - Redis (optional, for caching and queue performance)

---

## System Architecture

\`\`\`
Customer (React Web/Mobile)
↕
API Gateway (Express + JWT Auth)
↕
MongoDB (User, Shop, QueueEntry)
↕
Optional: Redis Cache / AI Microservice
\`\`\`

Real-time features via **Socket.io** for chat and queue status updates.

---

## Setup & Development Guide

### 1. Clone repo and install dependencies

\`\`\`bash
git clone <repo_url>
cd inq

# Backend

cd server
npm install

# Frontend

cd ../client
npm install
\`\`\`

### 2. Environment Variables

Create \`.env\` files in \`server\`:

\`\`\`
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5000
GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
\`\`\`

### 3. Start development servers

\`\`\`bash

# In one terminal: Backend

cd server
npm run dev

# In another terminal: Frontend

cd client
npm start
\`\`\`

### 4. API Documentation

Use Postman or Swagger to test:

- \`/api/auth/register\`
- \`/api/auth/login\`
- \`/api/shops\` (CRUD)
- \`/api/queue\` (Join/View/Manage)

---

## Docker Setup

### Dockerfile (Backend)

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package\*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
\`\`\`

### Dockerfile (Frontend)

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package\*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

### docker-compose.yml

\`\`\`yaml
version: "3"
services:
backend:
build: ./server
ports: - "5000:5000"
environment: - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
frontend:
build: ./client
ports: - "3000:3000"
\`\`\`

Run with:

\`\`\`bash
docker-compose up --build
\`\`\`

---

## AI & Chat System Ideas

- **Wait Time Prediction:**  
  Collect queue history, then run ML models (e.g., regression, time series forecasting) to improve wait time estimates.

- **Chat System:**  
  Use **Socket.io** to implement real-time chat between customers and Shop Owners for queries or announcements.

---

## Map & Nearby Location Integration

- Use **Google Maps API** or **Mapbox** in frontend to:
  - Show shops on interactive maps
  - Filter shops by radius or categories
  - Allow customers to find nearest available shops with queue slots

---

## 7-Day Sprint Plan

| Day | Task                                         |
| --- | -------------------------------------------- |
| 1   | Project setup, env vars, JWT auth system     |
| 2   | Shop CRUD API + Frontend integration         |
| 3   | Customer queue join + live status display    |
| 4   | Shop Owner queue management + status updates |
| 5   | Token generation + AI wait time integration  |
| 6   | Map integration + nearby shop filters        |
| 7   | Real-time chat + final testing + deployment  |

---

## Contribution

Contributions are welcome! Please open issues or PRs for bugs, features, or docs.

---

## License

MIT License © 2025 Your Name

---

_Created with ❤️ for a better queuing experience_
