# Dom-local Hermes Agent runtime extension.
#
# Upstream image remains the source of Hermes itself. This layer only adds
# small CLI dependencies needed by Dom's existing cron/workflow automation.
FROM nousresearch/hermes-agent:latest

USER root

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      bash \
      ca-certificates \
      curl \
      gh \
      git \
      jq \
      nodejs \
      npm \
      ripgrep \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m pip install --no-cache-dir 'hermes-agent[web]'

RUN cd /app/web \
    && npm install \
    && npm run build \
    && npm cache clean --force \
    && rm -rf node_modules

# Cursor CLI installs to ~/.local/bin by default when installed as root. Copy
# the resolved binary into a shared location so the non-root hermes gateway user
# can execute it without traversing /root.
ENV PATH="/root/.local/bin:${PATH}"
RUN curl https://cursor.com/install -fsS | bash \
    && install -d -m 0755 /usr/local/lib/cursor-agent \
    && cp -a "$(dirname "$(readlink -f /root/.local/bin/agent)")/." /usr/local/lib/cursor-agent/ \
    && chmod -R a+rX /usr/local/lib/cursor-agent \
    && ln -sf /usr/local/lib/cursor-agent/cursor-agent /usr/local/bin/agent \
    && ln -sf /usr/local/lib/cursor-agent/cursor-agent /usr/local/bin/cursor-agent \
    && /usr/local/bin/agent --version

# Keep the upstream entrypoint/user behavior intact.
