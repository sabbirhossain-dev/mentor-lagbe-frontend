# MentorLagbe (Smart Tuition & Mentorship Platform)

**MentorLagbe** is a full-stack, role-based EdTech platform connecting qualified academic tutors offering subject-wise batches and 1-on-1 mentorship with students seeking personalized academic clarity. The platform provides moderation tools for Admins to review listings, manage user roles, and monitor subscriptions.

---

## 🌐 Live URLs & Demo Credentials

- **Live Frontend Application:** `[Add Your Production Frontend URL Here]`
- **Live Backend API Server:** `[Add Your Production Backend URL Here]`

### Default Demo Accounts

| Role | Email | Password / Notes | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `hossain@gmail.com` | `[Admin Password]` | Full platform moderation, user role management, tuition approvals, transactions audit |
| **Tutor** | `sabbirt@gmail.com` | `[Tutor Password]` | Post batches (ImgBB upload), manage created tuitions, accept/reject student applicants |
| **Student** | `sabbir3@gmail.com` | `[Student Password]` | Search/filter tuitions, submit applications, track status, cancel pending applications |

*(Note: Users can also self-register as Student or Tutor via `/sign-up`)*

---

## 🚀 Key Features

### 1. Stakeholders & Role-Based Workflows
- **Student Portal:**
  - Dynamic Overview stats (Total Applied, Accepted, Pending, Subscription Tier).
  - Search & filter approved tuitions by Subject, Class Level, and Mode (Online/Offline).
  - Submit enrollment applications with preferred schedule and learning notes.
  - View real-time status and cancel pending applications anytime.
- **Tutor Portal:**
  - Post tuition listings with direct image upload via ImgBB API.
  - Free Plan limit protection (max 2 tuitions for Free Tutors, unlimited for Pro Tutors).
  - Full CRUD management of created tuitions with one-click Active/Closed visibility toggle.
  - Review incoming student applicants with contact details and mark as Accepted/Rejected.
- **Admin Control Center:**
  - Overview of platform metrics (Total Users, Tutors, Students, Approved/Pending listings, Stripe Revenue).
  - User Role Management (reassign roles between Student, Tutor, and Admin).
  - Tuition Moderation queue (approve or reject submitted tutor listings).
  - Transaction Audit (inspect all subscription payment records and transaction IDs).

### 2. Modern UI & Unique Highlights
- **Smart Tuition Estimator (Unique Home Section):** Interactive calculator allowing students to select Class Level, Subject, and Mode to view expected monthly budget and jump straight to matching tutors.
- **Direct ImgBB Image Upload:** File upload integration with live preview for both Profile pictures and Tuition banners.
- **Server-Side Search & Filtering:** Dynamic MongoDB queries for title/subject regex search, multi-parameter filters, and pagination.
- **Feedback & Notifications:** Integrated `react-hot-toast` for all form submissions, auth status, and CRUD actions.
- **Error & Loading States:** Custom 404 (`not-found.tsx`), Error Boundary (`error.tsx`), and Loading skeletons (`loading.tsx`).

---

## 🛠️ Tech Stack & Packages

### Frontend (`mentorlagbe-frontend`)
- **Framework:** Next.js 16 (App Router) with React 19 & TypeScript
- **Styling:** Tailwind CSS v4 with Shadcn UI & Base UI
- **Authentication:** Better Auth (`better-auth`, `@better-auth/mongo-adapter`) with JWKS token exchange
- **Media & Icons:** Lucide React, ImgBB REST API
- **Feedback:** React Hot Toast (`react-hot-toast`)

### Backend (`mentorlagbe-backend`)
- **Runtime:** Node.js with Express.js v5 (ES Modules)
- **Database:** MongoDB Native Driver (`mongodb`) with Atlas Cluster
- **Security:** `jose` (JWT verification against Better Auth JWKS), Role-based custom Express middlewares (`verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`), `cors`
- **Configuration:** `dotenv`

---

## 📂 Project Structure

```
MentorLagbe Project/
├── mentorlagbe-backend/
│   ├── db.js                     # MongoDB connection & collection exports
│   ├── index.js                  # Express API routes & CORS setup
│   ├── middlewares/
│   │   ├── auth.js               # verifyToken, verifyStudent, verifyTutor, verifyAdmin
│   │   └── verifyToken.js        # Backward-compatible middleware export
│   └── scripts/
│       ├── promote-admin.js      # CLI script to grant admin role
│       └── seed.js               # Database seeder (12 realistic approved tuitions)
│
└── mentorlagbe-frontend/
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/           # Sign-in & Sign-up routes with role selection
    │   │   ├── (dashboard)/      # Protected dashboard shell & role-specific pages
    │   │   │   ├── dashboard/admin/
    │   │   │   ├── dashboard/student/
    │   │   │   ├── dashboard/tutor/
    │   │   │   └── dashboard/profile/
    │   │   ├── (main)/           # Public landing, /tuitions, /tuitions/[id], /pricing, /about
    │   │   ├── api/auth/         # Better Auth API route handler
    │   │   ├── loading.tsx       # Global loading spinner
    │   │   ├── not-found.tsx     # Custom 404 page
    │   │   └── error.tsx         # Error boundary
    │   ├── components/           # Reusable UI, dashboard, home, and shared navigation
    │   ├── lib/                  # apiFetch, authClient, uploadImage (ImgBB)
    │   └── types/                # TypeScript interfaces
```

---

## ⚙️ Environment Variables

### Frontend (`mentorlagbe-frontend/.env`)
```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_atlas_connection_string
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

### Backend (`mentorlagbe-backend/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
AUTH_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000
```
