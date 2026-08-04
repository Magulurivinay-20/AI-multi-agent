PR Title: Add Render manifest and deployment instructions

Description
-----------
This PR adds `render.yaml` to define two Docker-based services (frontend and backend), a CI step to optionally trigger Render deploys, and a short deployment guide. The goal is to enable one-click import to Render or manual creation of services that match the manifest.

Files added
- `render.yaml` - Render service definitions for frontend and backend
- `.github/workflows/ci.yml` - CI updated to optionally trigger Render deploys via API
- `README_DEPLOY.md` - deployment guide and Render instructions

Checklist (for PR reviewer / maintainer)
- [ ] Confirm `render.yaml` paths match repository layout (`Dockerfile`, `backend/Dockerfile`).
- [ ] Ensure build commands work in Render (Docker builds succeed).
- [ ] Optional: Add Render environment variables and secrets in the Render dashboard.
- [ ] If using CI auto-triggers, add the following GitHub secrets:
  - `RENDER_API_KEY` — Render API key
  - `RENDER_SERVICE_ID_BACKEND` — Render service ID for backend
  - `RENDER_SERVICE_ID_FRONTEND` — Render service ID for frontend
  - `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` (if using Docker Hub push)

How to import on Render (recommended)
1. Push this branch and open the PR.
2. In Render, go to "New" -> "Import from GitHub" and select this repo. Render will detect `render.yaml` and show import options.
3. Follow prompts to create the two services. For manual creation choose:
   - Backend: Dockerfile path `backend/Dockerfile`, port `8080`.
   - Frontend: Dockerfile path `Dockerfile`, port `80`.

How to get Render service IDs (for CI)
1. After creating services in Render, use the API to list services and find the `id` fields:

```bash
curl -H "Authorization: Bearer RENDER_API_KEY" https://api.render.com/v1/services
```

2. Copy the `id` for backend and frontend and add to GitHub secrets `RENDER_SERVICE_ID_BACKEND` and `RENDER_SERVICE_ID_FRONTEND`.

Create the PR (example commands)
```bash
git checkout -b add/render-manifest
git add render.yaml RENDER_PR.md README_DEPLOY.md .github/workflows/ci.yml
git commit -m "chore: add render manifest + deploy guide"
git push -u origin add/render-manifest
# Open a PR in GitHub and use the template above in the description
```

Verification
- After Render creates services, wait for build logs to finish and confirm services are reachable at the provided `.onrender.com` URLs.
- Optionally trigger CI by merging to `main` to build/push Docker images and trigger Render deploys if secrets are present.

If you want I can create the branch here, commit these files, and provide the exact PR body ready to paste. Tell me if you'd like me to create the branch and push instructions or prepare a full PR body text.
