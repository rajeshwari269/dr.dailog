# DrDialog

DrDialog is a modern web application for medical consultations, doctor management, and session-based chat. Built with Next.js, it leverages a robust tech stack and follows best practices for scalability and maintainability.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Learn More](#learn-more)
- [Deployment](#deployment)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** Drizzle ORM (with SQL migrations)
- **Voice:** Vapi
- **Styling:** CSS, PostCSS
- **Linting:** ESLint
- **UI Components:** Custom components in `/src/components/ui`
- **Authentication:** Custom (see `/src/app/(auth)`)
- **API Routes:** Next.js API routes in `/src/app/api`
- **State Management:** React Context API

## Project Structure

```
drdialog/
├── drizzle/                # Database migrations and metadata
├── public/                 # Static assets (images, SVGs)
├── shared/                 # Shared React components
├── src/
│   ├── app/                # Next.js app directory (routing, pages, layouts)
│   │   ├── (auth)/         # Authentication pages (sign-in, sign-up)
│   │   ├── (main)/         # Main app features (dashboard, history, pricing)
│   │   ├── api/            # API route handlers
│   ├── components/         # UI components (Avatar, Button, Dialog, etc.)
│   ├── config/             # Database config and schema
│   ├── context/            # React Context providers
│   ├── lib/                # Utility functions
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── eslint.config.mjs       # ESLint configuration
```

# Features

- Doctor listing and management
- Medical consultation sessions with chat
- User authentication (sign-in, sign-up)
- Medical report viewing and history tracking
- Pricing information
- Modern, reusable UI components
- Database migrations with Drizzle ORM

## Images of the app

## ![Dr Landing Page](https://github.com/priyansh-narang2308/Dr.Dialog/blob/main/screenshots/MainPage.png)

## ![Dr Dashboard](https://github.com/priyansh-narang2308/Dr.Dialog/blob/main/screenshots/dashboard.png)

## ![Dr Report](https://github.com/priyansh-narang2308/Dr.Dialog/blob/main/screenshots/report.png)

## ![Dr Chat Page](https://github.com/priyansh-narang2308/Dr.Dialog/blob/main/screenshots/chatpage.png)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `dev` – Start the development server
- `build` – Build the application for production
- `start` – Start the production server
- `lint` – Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vercel Deployment](https://vercel.com/docs)

## Deployment

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

---
