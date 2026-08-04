Title: chore: add render manifest + deploy guide

Description
-----------
Adds `render.yaml` to define frontend and backend services, CI steps to optionally trigger Render deploys, Dockerfiles, docker-compose, and a deployment guide. This enables easy import into Render or manual creation of services.

Changes
-------
- `render.yaml` — Render manifest for frontend and backend
- `Dockerfile` — frontend multi-stage build + nginx
- `backend/Dockerfile` — backend Maven build + JRE
- `nginx.conf` — nginx config for SPA routing and /api proxy
- `docker-compose.yml` — local compose for frontend+backend
- `.github/workflows/ci.yml` — build/push images and optional Render deploy trigger
- `README_DEPLOY.md` — deployment guide
- `RENDER_PR.md` — PR checklist and Render import instructions

Checklist
---------
- [ ] Verify `Dockerfile` and `backend/Dockerfile` paths are correct for your repo layout.
- [ ] Confirm backend build works locally: `cd backend && mvn -B -DskipTests package`.
- [ ] Add required provider secrets to GitHub (see README_DEPLOY.md).
- [ ] Import `render.yaml` on Render or create services manually and copy service IDs to GitHub secrets if using CI triggers.

Notes
-----
- CI will push images to Docker Hub — set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` as secrets.
- To enable Render auto-deploy via CI add `RENDER_API_KEY`, `RENDER_SERVICE_ID_BACKEND`, and `RENDER_SERVICE_ID_FRONTEND`.

PR Body (copy into GitHub PR description):

```
This PR adds Render manifest and deployment configuration to enable easy deployment of the frontend and backend.

Files added:
- render.yaml
- Dockerfile
- backend/Dockerfile
- nginx.conf
- docker-compose.yml
- .github/workflows/ci.yml (updated)
- README_DEPLOY.md (updated)
- RENDER_PR.md

See RENDER_PR.md for the import checklist and Render instructions.
```
