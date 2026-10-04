---
name: api-change
description: Change a Job Portal Express endpoint, Mongoose model, or its frontend API contract.
---

# API change

Trace the complete contract before editing: route registration, middleware, controller, model, and the frontend hook or Axios consumer. Keep existing `/api/v1` route conventions and the response shape expected by the client unless the requested change deliberately changes it.

For protected actions, verify the authenticated user and applicable student/recruiter ownership or role. For uploads, keep the existing Multer and Cloudinary flow rather than bypassing it. Validate user-controlled input at the API boundary and avoid exposing secrets or password fields.

When a schema or response changes, update every in-repo consumer in the same task. State any migration, seed-data, or manual endpoint verification still needed; do not claim backend coverage that does not exist.
