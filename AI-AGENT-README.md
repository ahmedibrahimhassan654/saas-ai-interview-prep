# AI Agent Engineering Workflow

This document defines the engineering workflow for AI agents working on this project. Based on the principles from "The Engineering System for AI Agents" (JavaScript Mastery).

## Core Philosophy

**Building with AI doesn't compound by default — it decays.** Every feature makes the next one harder unless we impose engineering discipline.

> "The difference between someone who prompts an AI and someone who engineers with it was never a better model or a smarter prompt. It's this: Decide what to build first. Make the hard calls on purpose. Keep the state in files and never ever let the AI decide something important without telling you."

---

## The Workflow (5 Stages)

### 1. SCOPE — Plan Before Code
**Never open the editor first.** Requirements before code.

- Interview the stakeholder: Who is this for? What's in v1? What waits? What depends on what?
- Choose a build strategy: thin slice, smallest usable version, or full journey
- Output: Ordered plan (what, not how)
- **Tool:** `scope` skill

### 2. ARCHITECT — Design Decisions On Purpose
**A plan isn't a design.** Make engineering decisions explicitly.

- Database design, tech stack, critical logic, architecture for scale
- Think in patterns first: monolith default, relational DB, paginate lists, rate limit endpoints, no secrets in code
- For every decision: recommend one option + honest alternative with reason
- **Source-of-truth check:** Every value the feature shows/computes must have a named source
- **Tool:** `architect` skill

### 3. DEVELOP — Build With Guardrails
**Stop when decisions are missing.**

- Refuse to build if a value has no source (decision owed)
- List every value the feature produces → check plan for source → stop on gaps
- Override allowed but flagged in file until properly decided
- **Tool:** `develop` skill

### 4. CONTEXT — Keep State in Files
**Context files > chat history.**

- Single `AGENTS.md` for simple apps, or root + per-directory files for monorepos
- Written from actual codebase (not assumptions)
- Never overwrites human edits; fills gaps only
- Flags conflicts between docs and code
- **Tools:** `audit` (initial), `sync` (ongoing)

### 5. VERIFY — Prove It Works
**"Done" ≠ "It works."** Four separate jobs:

| Job | Purpose |
|-----|---------|
| **check-verify** | Drive real app, click flow, hit endpoints, watch against plan criteria |
| **test** | Write tests for what callers rely on and what would genuinely break |
| **review** | Fresh model reviews diff, ranks findings (catches author's blind spots) |
| **document** | PR description, changelog from actual diff (not AI memory) |

Match effort to risk: prototype = self-check; payment system = all four.

### 6. DEBUG — Fix Causes, Not Symptoms
**Investigate, don't guess.**

1. Reproduce reliably first
2. Narrow to smallest failing spot
3. Form ONE theory → test it → confirm or discard
4. Fix root cause (why was it null?), not symptom (clamp null)
5. Write regression test (fails without fix, passes with it)
6. Hunt for same mistake elsewhere
7. If bug = bad decision → escalate to redesign

---

## Project-Specific Conventions

### Tech Stack (Fixed)
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Database:** MongoDB + Mongoose
- **Auth:** NextAuth.js v4 (credentials + OAuth)
- **UI:** HeroUI v3 (`@heroui/react`), Tailwind CSS v4
- **Forms:** HeroUI Form + `useGenericSubmitHandler` hook
- **Toasts:** `react-hot-toast`
- **Icons:** `@iconify/react`

### Code Patterns
- **Server Actions** for mutations (`"use server"` in `actions/`)
- **Client Components** with `"use client"` for interactive UI
- **Custom Hooks** for reusable logic (`components/form/`)
- **Error Handling:** `catchAsyncError` + `extractErrors` → structured `{ error: { message, statusCode } }`
- **Loading States:** Managed in hook, reflected via `isPending`/`isDisabled` on HeroUI Buttons

### File Structure
```
app/                    # Next.js App Router pages
├── layout.tsx          # Root layout with <Toaster />
├── login/page.tsx
├── register/page.tsx
├── app/dashboard/      # Protected routes
actions/                # Server Actions
backend/
├── config/dbConnect.ts
├── models/user.model.ts
├── controllers/auth.controller.ts
├── middlewares/catchAsyncError.ts
├── utils/extractErrors.ts
components/
├── auth/register.tsx
├── auth/login.tsx
├── form/generic-submit-handler.ts
├── layout/             # Navbar, Footer, etc.
├── providers.tsx       # SessionProvider
config/                 # Site config, Logo
constants/              # User roles, etc.
```

---

## Rules for AI Agents Working Here

### DO
- Read this file and all `AGENTS.md`/`CLAUDE.md` files first
- Follow existing patterns (HeroUI v3 API, Server Actions, hooks)
- Use `catchAsyncError` wrapper for all controllers
- Return structured errors from server actions
- Use `react-hot-toast` for all notifications
- Use `useRouter` from `next/navigation` for redirects
- Preserve existing toast/error handling logic
- Add `isDisabled={loading}` to social auth buttons during submit

### DON'T
- Change HeroUI v3 API to v2 (`color`/`isLoading`/`isDisabled` props don't exist)
- Throw errors from controllers/server actions (return error objects)
- Use HeroUI `toast` component (use `react-hot-toast`)
- Modify auth callbacks/providers without explicit request
- Change Google/GitHub sign-in handlers
- Skip the verification step after building

### DECISION LOG
| Decision | Choice | Reason |
|----------|--------|--------|
| Error handling | `catchAsyncError` + `extractErrors` | Structured errors to client, no opaque Next.js errors |
| Toast library | `react-hot-toast` | Lightweight, works with SSR, top-right positioning |
| Form submit | `useGenericSubmitHandler` hook | Reusable loading + FormData extraction |
| Duplicate email | `extractErrors` handles `code: 11000` | Friendly "Email already exists" message |
| Credentials error | Map `CredentialsSignin` → "Invalid email or password" | NextAuth sanitizes custom authorize messages |
| Redirect after register | `/login` | User must sign in after account creation |
| Redirect after login | `/dashboard` | Matches protected route structure |

---

## How to Use This Document

1. **Before starting any feature:** Read SCOPE + ARCHITECT sections
2. **During development:** Follow DEVELOP guardrails — stop if a value lacks a source
3. **After coding:** Run all four VERIFY jobs appropriate to risk level
4. **When debugging:** Follow DEBUG discipline — one theory at a time
5. **Always:** Update context files (`audit`/`sync`) when conventions change

---

## References
- Video: "The Engineering System for AI Agents" — JavaScript Mastery
- Course: Agentic Engineering (JavaScript Mastery)
- Skills: scope, architect, develop, audit, sync, check-verify, test, review, document, debug