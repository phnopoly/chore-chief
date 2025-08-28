# ChoreChamp (Monorepo)

A full‑stack household management app that makes chores, bills, and shopping **fair, fast, and fun**—for roommates and for solo use.

---

## TL;DR (Quick Start)

```powershell
# Requirements
# Node >= 18.17, npm >= 10

# install all workspaces\ npm install

# dev all apps via Turborepo (web=:3000, api=:3001)
npm run dev

# or target a single workspace
npm run dev -w apps/web
npm run dev -w apps/api

# lint / format / test
npm run lint
npm run format
npm run test --workspaces --if-present
```

> Workspaces you can target with `-w`: `apps/web`, `apps/api`, `@chore-champ/ui`, `@chore-champ/utils`, `@chore-champ/config`.

---

## Objective

**ChoreChamp** eliminates daily friction in shared living by unifying smart chore rotation, expense tracking, shopping lists, reminders, and gamification in one seamless app. It’s purpose‑built for students and young professionals—the group most prone to “whose turn is it?” conflicts—and it also shines in **Solo Mode** as a personal productivity tool. A freemium model supports sustainable monetization with premium analytics, exports, and household rewards.

---

## Why ChoreChamp

- **Universal pain point**: chores, bills, and supplies are daily headaches.
- **Unique combo**: fairness + gamification + expenses + shopping in one flow.
- **Hook**: leaderboards and streaks turn chores into motivation.
- **Campus wedge**: ideal for shared housing.
- **Solo fallback**: valuable even after roommates move out.

---

## Architecture Overview

- **Framework**: Next.js (App Router)
- **Monorepo**: Turborepo (caching, parallel tasks); shared packages in `packages/*`
- **Web App**: Next.js + TypeScript + Sass + Chakra UI (RCL), React
