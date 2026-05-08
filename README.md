# 🎓 College Discovery Platform

A production-grade MVP for discovering, comparing, and evaluating colleges built using modern full-stack technologies.

🌐 **Live Demo:** https://collegediscoveryplatform-production-0f4f.up.railway.app/  
---

# 🚀 Features

## 🔍 College Listing & Search

- Browse colleges with a clean and responsive UI
- Search colleges by name
- Filter colleges by:
  - Location
  - Course
- Pagination / optimized data loading
- Fast and user-friendly experience

---

## 🏫 College Detail Page

Detailed information for each college including:

### Overview
- College information
- Fees structure
- Ratings
- Location

### Sections
- Courses Offered
- Placements Information
- Additional college details

---

## ⚖️ Compare Colleges (High Priority Feature)

Compare 2–3 colleges side-by-side with:

- Fees
- Placement Percentage
- Ratings
- Location
- Key metrics comparison table

---

## 📈 College Predictor Tool

Predict colleges based on:

### Inputs
- Exam name (e.g., JEE)
- Rank

### Output
- Recommended colleges list

---

# 🛠️ Tech Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS

## Backend
- Next.js API Routes
- Prisma ORM

## Database
- PostgreSQL
- Supabase

## Deployment
- Railway (Frontend + Backend)

---

# 🧱 System Architecture

```text
Client (Next.js + Tailwind)
        ↓
API Layer (Next.js API Routes)
        ↓
Prisma ORM
        ↓
Supabase PostgreSQL Database
```

---

# 📂 Project Structure

```bash
College_Discovery_Platform/
│
├── prisma/                 # Prisma schema & migrations
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utility functions
│   ├── services/           # API/data handling
│   └── styles/             # Global styles
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/UditSingh1893/College_Discovery_Platform.git
cd College_Discovery_Platform
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL=your_supabase_postgresql_url
```

---

## 4️⃣ Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

## 5️⃣ Start Development Server

```bash
npm run dev
```

App will run on:

```bash
http://localhost:3000
```

---

# 🗄️ Database

This project uses:

- **PostgreSQL** as the primary database
- **Supabase** for managed database hosting
- **Prisma ORM** for type-safe database access

---

# 📸 Core Functionalities

##  College Search
Efficient filtering and searching experience with dynamic UI updates.

##  Comparison Engine
Compare multiple colleges instantly using structured tabular data.

##  Predictor Logic
Basic recommendation engine based on exam rank and criteria.

##  Responsive UI
Fully responsive interface built with Tailwind CSS.

---

# 🌍 Deployment

The application is deployed on **Railway**.

### Deployment Stack
- Frontend → Railway
- Backend/API → Railway
- Database → Supabase PostgreSQL

---

# 🔮 Future Improvements

- Authentication & user profiles
- Saved colleges / wishlist
- Advanced recommendation engine
- AI-powered college matching
- Reviews & ratings system
- Cutoff analytics
- College application tracking
- Admin dashboard

---

# 📚 Learning Outcomes

This project demonstrates:

- Full-stack application architecture
- Database modeling with Prisma
- Production deployment workflows
- Building scalable Next.js applications
- Backend API development
- Search/filter optimization
- Responsive UI/UX design

---