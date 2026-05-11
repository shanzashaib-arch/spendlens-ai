# SpendLens AI

SpendLens AI is a web application that helps startups and teams analyze their AI tool spending and identify optimization opportunities.

The platform audits AI subscriptions such as ChatGPT, Claude, Cursor, GitHub Copilot, and Gemini to recommend smarter pricing plans and cost-saving alternatives.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Features

* **Intelligent Audit Engine:** Custom logic to analyze AI stack and recommend cheaper alternatives (e.g., Switching from Cursor to Copilot for small teams).
* **AI Spend Audit Form:** Interactive form to capture tool details, plans, and team size.
* **Real-time Savings Analytics:** Instant calculation of monthly and annual projected savings.
* **Cost Optimization Recommendations:** Personalized tips to reduce burn rate.
* **AI-Generated Summaries:** (Coming Soon) Detailed insights using LLMs.

## Deployment

Live Demo: https://spendlens-ai.vercel.app

## Screenshots

Add screenshots here before submission.

## Decisions

### 1. Rule-based audit engine instead of AI-generated recommendations
This improved transparency and reduced hallucination risks.

### 2. Next.js App Router
Enabled unified frontend and backend architecture.

### 3. Supabase instead of custom backend
Reduced infrastructure complexity during MVP development.

### 4. Public shareable reports
Improved virality and distribution potential.

### 5. Tailwind CSS
Allowed rapid UI iteration and consistency.
## Live Demo

https://spendlens-ai.vercel.app

## Screenshots

### 1. Landing Page
A modern, high-converting hero section that invites users to start their audit.
![Landing Page](/screenshots/landing.png)

### 2. Audit Input Form
Simple and intuitive form where users select their tools, plans, and seat usage.
![Audit Form](/screenshots/form.png)

### 3. Comprehensive Audit Results
Instant breakdown of potential savings, reasoning, and specific plan recommendations.
![Audit Results](/screenshots/results.png)

## Local Setup

```bash
npm install
npm run dev