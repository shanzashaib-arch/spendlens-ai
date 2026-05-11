# Architecture

## System Overview

```mermaid
flowchart TD

A[User Opens App]
--> B[Fills Audit Form]

B --> C[Client State Management]

C --> D[Audit Engine]

D --> E[Generate Recommendations]

E --> F[AI Summary API]

F --> G[OpenAI API]

E --> H[Save Audit API]

H --> I[Supabase Database]

E --> J[Render Results]

J --> K[Shareable Public URL]

---

# STEP 2 — REFLECTION.md

Create:
```bash id="m1z6vr"
REFLECTION.md
# Reflection

## 1. The hardest bug I hit this week

The hardest issue I encountered involved localStorage persistence conflicting with server rendering in Next.js App Router. Initially, the application attempted to access localStorage during the server render phase, causing hydration mismatch warnings and inconsistent UI behavior.

My first hypothesis was that the issue came from incorrect state initialization, so I experimented with default state values. After debugging further, I realized the actual problem was that localStorage only exists in the browser environment.

I solved the issue by moving persistence logic into useEffect hooks so the code only executed client-side after hydration completed. I also added safer fallback defaults to prevent undefined states.

This taught me the importance of understanding the rendering lifecycle in Next.js and separating server-safe logic from browser-only functionality.

## 2. A decision I reversed mid-week

Initially, I planned to make the audit recommendation engine fully AI-driven. However, after reviewing the assignment instructions more carefully, I realized Credex specifically wanted deterministic logic for pricing and recommendations.

I reversed the decision and moved the core audit calculations to rule-based logic instead. AI is now only used for generating the personalized summary paragraph.

This improved reliability, transparency, and defensibility of the recommendations while also reducing API costs and latency.

## 3. What I would build in week 2

If given another week, I would focus on improving audit intelligence and distribution features.

I would add:
- benchmark comparisons against similar company sizes
- usage-based optimization suggestions
- PDF export support
- Open Graph image generation
- referral-based sharing incentives
- better analytics dashboards
- transactional email workflows

I would also improve pricing accuracy through automated scraping or scheduled vendor pricing syncs.

## 4. How I used AI tools

I used ChatGPT primarily for debugging assistance, brainstorming UI ideas, and accelerating repetitive boilerplate generation. I also used AI to review architecture trade-offs and improve naming consistency.

However, I did not trust AI-generated pricing information or business logic without verification. I manually reviewed recommendation rules and all pricing assumptions.

One example where AI was wrong involved API route handling in Next.js App Router. An AI-generated implementation mixed Pages Router syntax with App Router conventions, which caused deployment failures. I identified the issue by reviewing the Next.js documentation and refactored the route handlers accordingly.

## 5. Self-rating

### Discipline — 8/10
I maintained daily progress and commits across multiple days while balancing learning and implementation.

### Code Quality — 7/10
The project architecture is modular and maintainable, though some areas could benefit from stronger typing and validation.

### Design Sense — 8/10
I focused on clean SaaS-inspired UI patterns and visual consistency throughout the application.

### Problem Solving — 8/10
I handled multiple integration and state management challenges independently through debugging and experimentation.

### Entrepreneurial Thinking — 7/10
I tried to think beyond the assignment by focusing on user value, shareability, and lead-generation workflows.