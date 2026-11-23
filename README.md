<div align="center">

# 🎓 MentorLagbe — Smart Tuition & Academic Mentorship Platform

**Concept-driven academic matching connecting qualified tutors and passionate students across Bangladesh without mediator commissions.**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.7.26-indigo?style=flat-square)](https://www.better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-6772E5?style=flat-square&logo=stripe)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

---

### 🌐 [Visit Live Application](https://mentorlagbe-frontend-three.vercel.app) | 📡 [API Server](https://mentorlagbe-backend-xi.vercel.app)

</div>

<br/>

## 📖 Project Purpose & Mission

Finding the right private tutor or academic batch in Bangladesh has traditionally been plagued by unverified middlemen, exorbitant agency commission fees, and opaque pricing. **MentorLagbe** was engineered to solve this challenge through a transparent, high-performance web platform that directly bridges tutors and students:

- **Zero Intermediary Commissions:** Direct connection between educators and learners with full visibility on monthly fees, weekly schedules, and curriculum coverage.
- **Concept-Driven Learning:** Focus on personalized mentorship, admission coaching, and subject-matter clarity across SSC, HSC, and University levels.
- **Role-Centric Experience:** Tailored dashboards for **Students**, **Tutors**, and **Admins** with real-time statistics, listing studios, and application workflows.
- **Integrated Premium Ecosystem:** Stripe-powered subscription models (Tutor Pro & Student Pro) offering unlimited postings, verified badges, and priority matching.

---

## 🌐 Live URLs & Demo Credentials

| Resource | URL |
| :--- | :--- |
| **Frontend Web App (Client)** | [https://mentorlagbe-frontend-three.vercel.app](https://mentorlagbe-frontend-three.vercel.app) |
| **Backend REST API Server** | [https://mentorlagbe-backend-xi.vercel.app](https://mentorlagbe-backend-xi.vercel.app) |

### 🔑 Demo Accounts for Evaluation

You can test every role-based feature using the pre-configured accounts below:

| Role | Email | Password | Access & Capabilities |
| :--- | :--- | :--- | :--- |
| 🛡️ **Admin** | `hossain@gmail.com` | `Admin@1234` | Full platform moderation, user role reassignment, tuition approval/rejection queue, Stripe revenue audit |
| 👨‍🏫 **Tutor** | `sabbirt@gmail.com` | `Tutor@1234` | Create/edit tuition batches, direct ImgBB uploads, manage applicants (accept/reject), view tuition stats |
| 🎓 **Student** | `sabbir3@gmail.com` | `Student@1234` | Search & filter tuitions, apply to batches, track application status, cancel pending applications, bookmark posts |

> 💡 **Note:** Visitors can also create a new account via the **`/sign-up`** page and choose either **Student** or **Tutor** role.

---

## 🚀 Key Features

### 1. 🛡️ Role-Based Architecture & Authentication
- Secure authentication powered by **Better Auth** with JWT session exchange and MongoDB storage.
- Real-time role verification (`student`, `tutor`, `admin`) protecting dashboard routes and API calls.
- Automated role redirection upon login with dedicated navigation shells.

### 2. 🔍 Smart Tuition Discovery & Hero Search
- **Instant Search:** Live regex-based search by tuition title, subject, or tutor name.
- **Multi-Filter System:** Filter listings by Subject, Class Level (Class 6-8, SSC, HSC, University), and Mode (Online, Offline, Hybrid).
- **Interactive Tuition Estimator:** Budget calculator on the homepage allowing students to calculate estimated monthly rates and immediately find matching tutors.
- **Server-Side Pagination & Sorting:** Smooth pagination with dynamic sorting by newest, fee (low-to-high, high-to-low).

### 3. 👨‍🏫 Tutor Studio & Management
- **Tuition Creator:** Easy-to-use batch creation form with title, subject, class level, mode, monthly fee, schedule, and full markdown-supported descriptions.
- **Direct ImgBB Image Upload:** Upload tuition banners and profile photos directly to ImgBB CDN with built-in client-side image compression fallback.
- **Listing Lifecycle Control:** Toggle listings between `Active` and `Closed` at any time, edit batch info, or delete listings.
- **Applicant Review:** Review student applications with student name, phone number, preferred schedule, and personal note; accept or reject applicants with instant status updates.
- **Plan Enforcement:** Free Tutors can create up to 2 active listings; Tutor Pro members enjoy unlimited listings and priority badges.

### 4. 🎓 Student Experience & Applications
- **One-Click Application:** Apply for any approved tuition with preferred timing and custom learning goals.
- **Application Status Tracker:** Real-time visibility on application status (`Pending`, `Accepted`, `Rejected`) with the option to cancel pending applications.
- **Saved Tuitions:** Bookmark favorite tuition posts to revisit later.

### 5. ⚙️ Admin Control Center
- **Analytics Overview:** Comprehensive KPI counters including total registered users, active tutors, students, approved/pending listings, and Stripe revenue.
- **Tuition Moderation Queue:** Review pending listings submitted by tutors and grant approval or rejection.
- **User Role Management:** Manage registered users and switch roles between Student, Tutor, and Admin on the fly.
- **Transaction Audit:** Inspect all processed Stripe subscription records including payment IDs, amounts, and dates.

### 6. 💳 Stripe Pro Subscriptions
- Fully functional **Stripe Checkout** integration for Student Pro ($10) and Tutor Pro ($15) tiers.
- Instant automated account upgrades to `plan: "pro"` upon payment verification.

### 7. 🎨 Responsive UI/UX & Design Details
- **100% Responsive Design:** Optimized for mobile phones, tablets, and desktop displays.
- **Dark / Light Mode:** Built-in theme switcher with smooth transitions powered by `next-themes`.
- **Custom Brand Identity:** Hand-crafted Royal Indigo & Violet graduation cap logo rendered consistently across Navbar, Dashboard Shell, and Footer.
- **Interactive Feedback:** Contextual toast alerts (`react-hot-toast`), skeleton loading states, and custom 404 / Error Boundary pages.
- **Universal Cursor Pointer:** Cursor pointer applied across all clickable buttons, badges, and dropdowns.

---

## 🛠️ NPM Packages & Dependencies

### Frontend Dependencies (`package.json`)

| Package | Version | Purpose / Usage |
| :--- | :--- | :--- |
| **`next`** | `16.4.6` | React framework with App Router, Server Components & Turbopack |
| **`react`** | `19.3.0` | Core React 19 UI library |
| **`react-dom`** | `19.3.0` | React DOM renderer |
| **`typescript`** | `^5` | Strict static typing and code reliability |
| **`tailwindcss`** | `4.3.3` | Next-generation utility-first CSS framework |
| **`better-auth`** | `^1.7.26` | Modern full-stack authentication framework |
| **`@better-auth/mongo-adapter`** | `^1.7.26` | MongoDB adapter for Better Auth users and sessions |
| **`lucide-react`** | `^1.76.0` | Modern, lightweight SVG iconography |
| **`react-hot-toast`** | `^2.6.1` | Sleek toast notifications for user actions |
| **`next-themes`** | `^0.4.6` | Flawless dark and light theme switching |
| **`@base-ui/react`** | `^1.9.0` | Accessible, unstyled UI primitives |
| **`jose`** | `^6.2.18` | Cryptographic JWT token handling & JWKS verification |
| **`mongodb`** | `^7.9.1` | Native MongoDB driver for authentication operations |
| **`class-variance-authority`** | `^0.7.1` | Composable component variant styling |
| **`tw-animate-css`** | `^1.4.0` | Tailwind CSS animation extensions |
| **`cn`** | `^0.5.2` | Classname merging utility |

---

## 📂 Project Structure

```
mentorlagbe-frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/                    # Authentication routes (Sign In & Sign Up)
│   │   │   ├── sign-in/page.tsx
│   │   │   └── sign-up/page.tsx
│   │   ├── (dashboard)/               # Protected role-based dashboard shell
│   │   │   ├── dashboard/
│   │   │   │   ├── admin/             # Admin Control Center (Users, Moderation, Transactions)
│   │   │   │   ├── tutor/             # Tutor Studio (Post tuition, My listings, Applicants)
│   │   │   │   ├── student/           # Student Portal (Applications, Saved tuitions)
│   │   │   │   └── profile/           # User profile settings & avatar upload
│   │   │   └── layout.tsx             # Shared dashboard layout with responsive sidebar
│   │   ├── (main)/                    # Publicly accessible routes
│   │   │   ├── page.tsx               # Landing page (Hero, Estimator, Featured Tuitions)
│   │   │   ├── tuitions/              # Tuition directory with search, filter, pagination
│   │   │   │   └── [id]/page.tsx      # Single tuition detail & application modal
│   │   │   ├── pricing/page.tsx       # Subscription plans & Stripe checkout
│   │   │   ├── about/page.tsx         # Platform story & mission
│   │   │   └── payment/success/       # Stripe payment callback verification
│   │   ├── api/auth/[...all]/route.ts # Better Auth backend API handler
│   │   ├── error.tsx                  # Global error boundary
│   │   ├── loading.tsx                # Global loading state
│   │   ├── not-found.tsx              # Custom branded 404 page
│   │   └── layout.tsx                 # Root layout with theme & toast providers
│   ├── components/
│   │   ├── dashboard/                 # Dashboard navigation, stats cards, and shells
│   │   ├── home/                      # Hero section, Tuition Estimator, Testimonials
│   │   ├── navigation/                # Responsive Navbar, ThemeToggle, BrandLogo
│   │   ├── shared/                    # Footer, Tuitions grid, Filter bar
│   │   └── ui/                        # Reusable UI primitives (Buttons, Cards, Modals)
│   ├── lib/
│   │   ├── api.ts                     # Centralized API fetcher with auth token passing
│   │   ├── auth.ts                    # Better Auth server configuration
│   │   ├── auth-client.ts             # Better Auth client hooks (useSession, signIn, signOut)
│   │   └── uploadImage.ts             # ImgBB image upload utility with client-side compression
│   └── types/                         # Shared TypeScript interfaces & models
├── public/                            # Static assets and brand icons
├── next.config.ts                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind CSS styling setup
└── package.json                       # Dependencies & scripts
```

---

## ⚙️ Environment Variables Guide

Create a `.env` or `.env.local` file inside the `mentorlagbe-frontend/` directory:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# MongoDB Database Connection (For Better Auth Adapter)
MONGODB_URI=your_mongodb_atlas_connection_string

# Backend REST API Server URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# ImgBB CDN API Key (For Profile & Tuition Image Uploads)
NEXT_PUBLIC_IMGBB_API_KEY=0c78446a1e6a350aa2ee4daa64b9e0e9
```

---

## 🚀 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sabbirhossain-dev/mentorlagbe-frontend.git
   cd mentorlagbe-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Set up your `.env.local` using the environment variables guide above.

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Open Browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 👨‍💻 Developer Information

- **Developer:** Md. Sabbir Hossain
- **GitHub Profile:** [@sabbirhossain-dev](https://github.com/sabbirhossain-dev)
- **Project Repository:** [mentorlagbe-frontend](https://github.com/sabbirhossain-dev/mentorlagbe-frontend)
- **Live Demo:** [https://mentorlagbe-frontend-three.vercel.app](https://mentorlagbe-frontend-three.vercel.app)

---

<div align="center">
  <sub>Built with ❤️ by <b>Md. Sabbir Hossain</b> for the academic community of Bangladesh.</sub>
</div>
