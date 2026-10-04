---
name: release-check
description: Verify this Job Portal before a release, deployment, or final feature handoff.
---

# Release check

Review the requested or current diff first and validate only the surfaces it changes. For frontend changes, run `npm run lint` and `npm run build` in `frontend/`. Do not install or upgrade dependencies as part of verification unless explicitly asked.

For backend-affecting changes, inspect route mounting, environment-variable usage, CORS and cookie behavior, and whether the Render configuration still starts the intended service. The backend has no test script: report manual endpoint checks or unverified behavior explicitly.

Finish with a short pass/fail summary, commands run, and blockers. Do not deploy, modify production configuration, or commit changes without explicit authorization.
