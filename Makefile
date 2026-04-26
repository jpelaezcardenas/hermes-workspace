COMPOSE := $(shell if [ -x /usr/local/bin/docker-compose ]; then echo /usr/local/bin/docker-compose; else command -v docker-compose 2>/dev/null || echo docker-compose; fi)
SERVICES := hermes-agent hermes-dashboard hermes-workspace
DOM_COMPOSE_FILES := -f docker-compose.yml -f docker-compose.override.yml
LOCAL_COMPOSE_FILES := $(DOM_COMPOSE_FILES) -f docker-compose.workspace-local.yml
COMPOSE_DOM := $(COMPOSE) $(DOM_COMPOSE_FILES)
COMPOSE_LOCAL := $(COMPOSE) $(LOCAL_COMPOSE_FILES)

.PHONY: help status recreate recreate-containers rebuild-agent rebuild-workspace rebuild-and-recreate verify logs dev-up dev-agent dev-workspace ensure-dom-files ensure-dom-env

# docker-compose.yml uses env_file: .env — create once from the example (never overwrites)
.env:
	@if [ -f .env ]; then :; else \
		test -f .env.example || (echo "Missing .env.example; cannot create .env" >&2; exit 1); \
		cp .env.example .env; \
		echo "Created .env from .env.example — set provider keys and HERMES_PASSWORD (Docker) as needed."; \
		fi

ensure-dom-env: .env
	@python3 scripts/dom-ensure-env.py

help:
	@printf '%s\n' 'Hermes Workspace local Docker commands:'
	@printf '%s\n' ''
	@printf '%s\n' '  make rebuild-and-recreate  Build dom agent runtime + dom workspace, recreate containers'
	@printf '%s\n' '  make rebuild-agent         Build dom/hermes-agent-runtime, recreate agent+dashboard'
	@printf '%s\n' '  make rebuild-workspace     Build dom/hermes-workspace:local, recreate workspace'
	@printf '%s\n' '  make dev-up                Alias for rebuild-and-recreate'
	@printf '%s\n' '  make dev-agent             Alias for rebuild-agent'
	@printf '%s\n' '  make dev-workspace         Alias for rebuild-workspace'
	@printf '%s\n' ''
	@printf '%s\n' '  make status                Show compose service status'
	@printf '%s\n' '  make recreate              Force-recreate Hermes containers from current images'
	@printf '%s\n' '  make verify                Run Dom-local workspace verification checks'
	@printf '%s\n' '  make logs                  Follow compose logs for the Hermes services'
	@printf '%s\n' ''
	@printf 'Compose binary: %s\n' '$(COMPOSE)'

# --- Dom-local source builds. These never run docker compose down -v; runtime data is kept. ---

ensure-dom-files:
	@test -f docker-compose.override.yml || (echo "Missing docker-compose.override.yml (Dom override)" >&2; exit 1)
	@test -f docker-compose.workspace-local.yml || (echo "Missing docker-compose.workspace-local.yml (Dom workspace local image)" >&2; exit 1)
	@test -f docker/dom-hermes-agent/Dockerfile || (echo "Missing docker/dom-hermes-agent/Dockerfile" >&2; exit 1)
	@test -f scripts/dom-workspace-entrypoint.sh || (echo "Missing scripts/dom-workspace-entrypoint.sh" >&2; exit 1)

dev-up: rebuild-and-recreate

dev-agent: rebuild-agent

dev-workspace: rebuild-workspace

status:
	$(COMPOSE_DOM) ps

recreate: recreate-containers

recreate-containers: ensure-dom-env ensure-dom-files
	$(COMPOSE_LOCAL) up -d --force-recreate $(SERVICES)

# Build only one service target because hermes-agent and hermes-dashboard share
# dom/hermes-agent-runtime:latest; building both together can race under classic compose.
rebuild-agent: ensure-dom-env ensure-dom-files
	$(COMPOSE_DOM) build hermes-agent
	$(COMPOSE_DOM) up -d --force-recreate hermes-agent hermes-dashboard

rebuild-workspace: ensure-dom-env ensure-dom-files
	$(COMPOSE_LOCAL) build hermes-workspace
	$(COMPOSE_LOCAL) up -d --force-recreate hermes-workspace

rebuild-and-recreate: ensure-dom-env ensure-dom-files
	$(COMPOSE_DOM) build hermes-agent
	$(COMPOSE_LOCAL) build hermes-workspace
	$(COMPOSE_LOCAL) up -d --force-recreate $(SERVICES)

verify:
	./scripts/dom-verify-hermes-workspace.sh

logs:
	$(COMPOSE_DOM) logs -f $(SERVICES)
