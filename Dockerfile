# syntax=docker/dockerfile:1.6
# Project Workspace — production Docker image
# Publishes to ghcr.io/outsourc-e/hermes-workspace
#
# Build locally:
#   docker build -t hermes-workspace .
# Run:
#   docker run -p 3000:3000 -e HERMES_API_URL=http://host.docker.internal:8642 hermes-workspace
# Or pull pre-built:
#   docker pull ghcr.io/outsourc-e/hermes-workspace:latest
#
# ─── build stage ─────────────────────────────────────────────────────────
FROM node:22-slim AS build
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate && apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Install deps (cache-friendly: copy only manifests first)
# Copy the workspace's package config
COPY sidecar/hermes-workspace/package.json sidecar/hermes-workspace/pnpm-lock.yaml* sidecar/hermes-workspace/pnpm-workspace.yaml* ./sidecar/hermes-workspace/
COPY sidecar/hermes-workspace/workspace-daemon/package.json ./sidecar/hermes-workspace/workspace-daemon/

# Copy the monorepo package it depends on.
# For a `file:` dependency, pnpm snapshots the package during install, so the
# prebuilt dist must be present before `pnpm install` runs.
COPY packages/hermes-ui/package.json packages/hermes-ui/
COPY packages/hermes-ui/dist ./packages/hermes-ui/dist

# We need to run pnpm install in the sidecar dir
WORKDIR /app/sidecar/hermes-workspace
RUN pnpm install --frozen-lockfile

# Now copy the full source for both
WORKDIR /app
COPY sidecar/hermes-workspace ./sidecar/hermes-workspace
COPY packages/hermes-ui/package.json ./packages/hermes-ui/package.json

# Build the workspace
WORKDIR /app/sidecar/hermes-workspace
RUN pnpm build

# ─── runtime stage ────────────────────────────────────────────────────────
FROM node:22-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates curl tini \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r workspace && useradd -r -g workspace -u 10010 workspace

WORKDIR /app

# Copy build artefacts + runtime deps from the sidecar directory
COPY --from=build --chown=workspace:workspace /app/sidecar/hermes-workspace/dist ./dist
COPY --from=build --chown=workspace:workspace /app/sidecar/hermes-workspace/node_modules ./node_modules
COPY --from=build --chown=workspace:workspace /app/sidecar/hermes-workspace/package.json ./package.json
COPY --from=build --chown=workspace:workspace /app/sidecar/hermes-workspace/skills ./skills
COPY --from=build --chown=workspace:workspace /app/sidecar/hermes-workspace/server-entry.js ./server-entry.js
COPY --chown=workspace:workspace infra/model-catalog.json ./model-catalog.json

USER workspace
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0 \
    HERMES_API_URL=http://hermes-agent:8642

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/ >/dev/null || exit 1

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "--max-old-space-size=2048", "dist/server/server.js"]
