# NexaAgent — Autonomous AI Agent Platform

NexaAgent is an enterprise-grade autonomous AI platform designed for end-to-end goal execution with human-in-the-loop governance.

## 🚀 Key Features
- **Goal Formulation & Execution**: Natural language prompt processing using Gemini Pro & OpenAI.
- **Autonomous Tool Orchestration**: Built-in plugins for Google Calendar, Gmail, Google Maps, and Supabase.
- **Light + Dark Theme System**: Minimal, editorial UI design system with Light Purple brand accents (`#A78BFA`).
- **Human-in-the-Loop Approval**: Governance workflows for sensitive user actions.

## 🛠️ Environment Setup
Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pfbtkptqqfhrntvwesuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

## 💻 Tech Stack
- Next.js 15 (App Router)
- React 19 + TypeScript
- TailwindCSS + Lucide Icons
- Supabase PostgreSQL & Auth