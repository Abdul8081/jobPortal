---
name: frontend-feature
description: Implement or modify a visible React job-portal feature, including its loading, empty, and error states.
---

# Frontend feature

Work inside `frontend/src`. Locate the existing route, component, custom hook, and Redux slice before adding a parallel pattern. Reuse the project’s UI components and Tailwind conventions when they fit.

Keep the UI aligned with the API contract. A data-changing action should expose pending and failure feedback; a data-reading screen should behave sensibly while loading and when no records match. Preserve role-gated navigation and protected routes.

Run `npm run lint` from `frontend/` after the change. Run `npm run build` when the change affects imports, routes, application startup, or production rendering.
