# Deployment Guide

This file explains how to build and deploy the fullstack app (frontend + backend).

Local (compose)

Run locally with Docker Compose:

```bash
docker-compose build
docker-compose up -d
```

Frontend will be available at http://localhost and backend at http://localhost:9090

Render (recommended)

1. Push your repository to GitHub (branch `main`).
2. Go to https://render.com and create a new service.
   - For the backend: Create a **Web Service** using Docker, connect your repo, point to `backend/Dockerfile`, and set the port to `8080`.
   - For the frontend: Create a **Web Service** (or Static Site) using Docker, point to the repository root `Dockerfile` and expose port `80`.
3. Enable Auto-Deploy from the `main` branch.
4. After deploy finishes, Render will provide public URLs like `https://<service-name>.onrender.com`.

Or: use the included `render.yaml` to configure both services as infrastructure-as-code in Render. In the Render dashboard import from `render.yaml` or push the repo and create services matching the names in `render.yaml`.

Docker Hub + GitHub Actions

1. Create Docker Hub account and repository (or use your namespace). 2 secrets required in GitHub repo settings:
   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_TOKEN` (Docker Hub access token)
2. The CI workflow in `.github/workflows/ci.yml` builds and pushes two images:
   - `${DOCKERHUB_USERNAME}/ai-multi-agent-frontend:latest`
   - `${DOCKERHUB_USERNAME}/ai-multi-agent-backend:latest`
3. From there you can deploy those images to Render, AWS ECS, Cloud Run, DigitalOcean, etc.

Auto-deploy to Render via GitHub Actions

If you prefer CI to trigger Render deploys automatically, add the following GitHub repository secrets:
- `RENDER_API_KEY` — your Render API key (create in Render account settings)
- `RENDER_SERVICE_ID_BACKEND` — the service ID for the backend service
- `RENDER_SERVICE_ID_FRONTEND` — the service ID for the frontend service

When those secrets are present, the CI workflow will call the Render API to create a new deploy after pushing images.

Notes

- If your backend requires environment variables (DB, API keys), configure them in Render/hosting provider and in GitHub Actions as secrets if needed.
- If using Render, set CORS on the backend (allow the frontend URL) or use the nginx proxy in Compose.
