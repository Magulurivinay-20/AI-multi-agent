#!/usr/bin/env pwsh
param(
  [string]$branchName = "add/render-manifest",
  [string]$remote = "origin",
  [string]$commitMsg = "chore: add render manifest + deploy guide"
)

Write-Host "Creating branch: $branchName"
git checkout -b $branchName

Write-Host "Staging files"
git add render.yaml RENDER_PR.md README_DEPLOY.md .github/workflows/ci.yml Dockerfile backend/Dockerfile nginx.conf docker-compose.yml PR_BODY.md RENDER_PR.md

Write-Host "Committing"
git commit -m $commitMsg

Write-Host "Pushing to remote: $remote"
git push -u $remote $branchName

Write-Host "PR body is in PR_BODY.md — copy it into the GitHub PR description or use gh CLI to create a PR."
Write-Host "To create PR with gh CLI:"
Write-Host "gh pr create --title 'chore: add render manifest + deploy guide' --body-file PR_BODY.md --base main --head $branchName"
