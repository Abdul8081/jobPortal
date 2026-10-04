# Job Portal agent guidance

This repository is a MERN job portal: `frontend/` is a Vite/React application and `backend/` is an Express/Mongoose API. Treat an API contract change as an end-to-end change: controller/route/model, the frontend call or hook, Redux state when applicable, and the affected UI states.

Use the repo skills only when their trigger matches: `frontend-feature` for visible React work, `api-change` for API or schema changes, and `release-check` before a requested handoff, deployment, or release.

For a bug or feature spanning independent frontend and backend investigation, a `codebase_mapper` may first trace the paths. Use `change_reviewer` for a requested review or security-sensitive auth/upload change. Do not delegate small, dependent edits.

The frontend validation command is `npm run lint` in `frontend/`, followed by `npm run build` when the changed work can affect the bundle. The backend currently has no automated test or lint command; validate the narrow endpoint behavior where safe and report any unverified integration.
