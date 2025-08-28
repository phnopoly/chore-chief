# ChoreChamp (Monorepo)

A full-stack household management app that makes chores, bills, and shopping **fair, fast, and fun**—for roommates and for solo use.

---

## TL;DR (Quick Start)

```powershell
# Requirements
# Node >= 18.17 (LTS recommended)
# Package manager: pnpm (preferred)

# 1. Enable pnpm
# If Node.js has Corepack (default for v16.13+):
corepack enable
corepack prepare pnpm@latest --activate

# Or install manually (PowerShell on Windows):
$pnpmHome = "$env:USERPROFILE\AppData\Local\pnpm"
mkdir $pnpmHome -Force | Out-Null
[System.Environment]::SetEnvironmentVariable("PNPM_HOME", $pnpmHome, "User")
[System.Environment]::SetEnvironmentVariable("Path", "$pnpmHome;$env:Path", "User")
pnpm self-update

# 2. Install all workspaces
pnpm install

# 3. Dev all apps via Turborepo (web=:3000, api=:3001)
pnpm dev

# Or target a single workspace
pnpm dev -w apps/web
pnpm dev -w apps/api

# 4. Lint / format / test
pnpm lint
pnpm format
pnpm test --workspaces --if-present
```
