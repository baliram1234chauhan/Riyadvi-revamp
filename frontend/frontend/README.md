<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->



# Riyadvi Software Technologies - Web Revamp Project

A dynamic, premium corporate web application featuring interactive 3D elements, full-stack API integration, lead generation forms, and an aggregated Admin Dashboard.

---

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **3D & Animations:** Three.js, React Three Fiber (R3F), `@react-three/drei`
- **Backend Framework:** FastAPI (Python)
- **Database:** SQLite / PostgreSQL
- **Deployment:** Vercel (Frontend), Render/Railway (Backend)

---

## 🚀 Key Features & Project Architecture

- **Multi-Page Architecture:** Fully routed multi-page application built to dynamic corporate standards.
- **3D Hero Visualization:** Interactive 3D technology ecosystem in the Hero section responding to user interaction.
- **Business Health Checkup Audit (`/business-health-checkup`):** Dedicated multi-step lead capture audit flow.
- **Lead Magnet Download (`/software-project-planning-guide`):** Dedicated resource download capture page.
- **Centralized Admin Dashboard (`/admin`):** Unified internal dashboard summarizing enquiries, health audit requests, and lead magnet submissions in real-time.

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/contact` | Submits general contact enquiries |
| `POST` | `/health-checkup` | Submits business health audit form data |
| `POST` | `/lead-magnet` | Submits software planning guide download requests |
| `GET` | `/admin/stats` | Fetches aggregated submission counts for Admin Dashboard |

---

## 🤖 AI Tools Used (Mandatory Documentation - Section 7)

### 1. Claude / ChatGPT
- **Purpose:** Fast prototyping for backend API routing, database schema structuring, and Next.js client-side redirection logic.
- **Example Prompt:** *"Create a FastAPI multi-route lead storage system with endpoints for /health-checkup and /lead-magnet, integrated with SQLite and CORS for Next.js."*
- **Manual Work & Customization:**
  - Standardized state handling in Next.js multi-step forms.
  - Implemented auto-redirection logic to the home page upon successful submission.
  - Custom-styled all form elements with Tailwind CSS matching Riyadvi's gold-and-dark visual language.

### 2. Cursor / GitHub Copilot
- **Purpose:** Code autocompletion, TypeScript interface definitions, and Tailwind CSS class recommendations.
- **Manual Work:** Handled complex 3D scene canvas responsiveness and adjusted lighting/materials for performance optimization on low-end GPUs.

---

## 📦 3D & Animation Libraries Used

- **Three.js & React Three Fiber (`@react-three/fiber`):** For rendering interactive 3D scenes.
- **Drei (`@react-three/drei`):** Helper functions for lights, camera controls, and environment effects.

---

## ⚙️ Local Setup Instructions

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev