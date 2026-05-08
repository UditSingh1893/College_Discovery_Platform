# College Discovery Platform

A production-grade MVP for discovering, comparing, and evaluating colleges using modern web technologies.

Inspired by platforms like:
- Careers360
- Collegedunia

Built with:
- Next.js 15
- TypeScript
- Tailwind CSS
- Prisma ORM
- Supabase PostgreSQL

---

# Features

## 1. College Listing + Search

- Fast searchable college directory
- Search by:
  - College name
- Filters:
  - Location
  - Course
  - Exam
  - College type
- Pagination support
- Responsive UI
- Server-side data fetching

---

## 2. College Detail Page

Detailed college profiles including:

- Overview
- Fees
- Courses offered
- Ratings
- Placement statistics
- Recruiters
- Accepted exams
- Highlights
- Ownership details

---

## 3. Compare Colleges

Compare 2–3 colleges side-by-side.

Comparison includes:
- Fees
- Placement %
- Rating
- Location
- Packages
- Ownership

---

## 4. College Predictor Tool

Predict eligible colleges based on:
- Exam
- Rank

Supports:
- JEE
- BITSAT
- GATE
- Other entrance exams

Returns:
- Matching colleges
- Fallback recommendations

---

# Tech Stack

## Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL

## Database

- Supabase PostgreSQL

## Deployment

Recommended:
- Vercel
- Supabase

---

# Project Structure

```bash
src/
├── app/
│   ├── api/
│   ├── colleges/
│   ├── compare/
│   ├── predictor/
│   └── components/
│
├── lib/
│   ├── prisma.ts
│   ├── utils.ts
│   └── college-service.ts
│
├── types/
│   └── college.ts
│
prisma/
├── schema.prisma
```

---

# Database Schema

## College Model

```prisma
model College {
  id               String   @id @default(cuid())
  slug             String   @unique
  name             String
  shortName        String

  location         String
  state            String

  courses          String[]

  fees             Int
  rating           Float

  placementPercent Int
  averagePackage   String

  exams            String[]

  closingRanks     Json

  type             String
  established      Int
  ownership        String

  overview         String

  highlights       String[]

  topRecruiters    String[]

  medianPackage    String
  highestPackage   String

  @@map("colleges")
}
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone <your-repo-url>
cd college-discovery-platform
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create:

```bash
.env
```

Add:

```env
DATABASE_URL="your_supabase_pooling_url"
DIRECT_URL="your_supabase_direct_url"
```

---

# Supabase Setup

## 1. Create Project

Go to:
https://supabase.com

Create a new project.

---

## 2. Get Database URLs

Inside:
- Project Settings
- Database
- Connection String

Copy:
- Transaction Pooler URL → DATABASE_URL
- Direct Connection URL → DIRECT_URL

---

# Prisma Setup

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Push Schema

```bash
npx prisma db push
```

---

# Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# API Routes

## Colleges

```bash
GET /api/colleges
```

Supports:
- search
- location
- course
- exam
- type
- pagination
- sorting

Example:

```bash
/api/colleges?search=iit&location=Delhi
```

---

## College Filters

```bash
GET /api/colleges/filters
```

Returns:
- locations
- courses
- exams
- types
- ownerships

---

## Predictor

```bash
GET /api/colleges/predict
```

Example:

```bash
/api/colleges/predict?exam=JEE&rank=12000
```

---

# Key Features Implemented

- Production-ready API architecture
- Server-side rendering
- Dynamic routes
- Type-safe Prisma queries
- Optimized filtering
- Scalable folder structure
- Reusable utility layer
- Responsive Tailwind UI
- Database normalization support

---

# Future Improvements

## Recommended Enhancements

### Authentication
- Clerk
- NextAuth

### Saved Colleges
- Wishlist
- Bookmarks

### Reviews System
- Student reviews
- Ratings

### Advanced Predictor
Add:
- Category
- Gender
- Home state
- Quota system

### Analytics
- Search trends
- Popular colleges

### AI Features
- College recommendation engine
- Personalized suggestions

---

# Deployment

## Vercel

```bash
vercel
```

Add environment variables in:
- Vercel Dashboard
- Project Settings
- Environment Variables

---

# Performance Optimizations

- Cached filter APIs
- Server Components
- Prisma query optimization
- Indexed PostgreSQL fields
- Minimal API payloads

---

# Author

Built by Udit Singh