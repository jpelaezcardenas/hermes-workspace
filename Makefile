COMPOSE := $(shell if [ -x /usr/local/bin/docker-compose ]; then echo /usr/local/bin/docker-compose; else command -v docker-compose 2>/dev/null || echo docker-compose; fi)
SERVICES := hermes-agent hermes-dashboard hermes-workspace

.PHONY: help status recreate recreate-containers rebuild-agent rebuild-and-recreate verify logs

help:
	@printf '%s\n' 'Hermes Workspace local Docker commands:'
	@printf '%s\n' ''
	@printf '%s\n' '  make status                Show compose service status'
	@printf '%s\n' '  make recreate              Force-recreate Hermes containers from current images'
	@printf '%s\n' '  make rebuild-and-recreate  Rebuild dom/hermes-agent-runtime, then recreate containers'
	@printf '%s\n' '  make rebuild-agent         Rebuild the shared Hermes agent/dashboard runtime image only'
	@printf '%s\n' '  make verify                Run Dom-local workspace verification checks'
	@printf '%s\n' '  make logs                  Follow compose logs for the Hermes services'
	@printf '%s\n' ''
	@printf 'Compose binary: %s\n' '$(COMPOSE)'

status:
	$(COMPOSE) ps

recreate: recreate-containers

recreate-containers:
	$(COMPOSE) up -d --force-recreate $(SERVICES)

# Build only one service target because hermes-agent and hermes-dashboard share
# dom/hermes-agent-runtime:latest; building both together can race under classic compose.
rebuild-agent:
	$(COMPOSE) build hermes-agent

rebuild-and-recreate: rebuild-agent recreate-containers

verify:
	./scripts/dom-verify-hermes-workspace.sh

logs:
	$(COMPOSE) logs -f $(SERVICES)
