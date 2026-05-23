# SaaS patches

Файлы здесь подменяют код из базового `nousresearch/hermes-agent:latest` через `Dockerfile.agent`.

## api_server.py

**Зачем:** дефолтный `gateway/platforms/api_server.py` не обрабатывает слэш-команды
— `_handle_chat_completions` всегда отдаёт запрос напрямую в `_run_agent` (LLM).
В результате `/status`, `/sessions`, `/help`, `/agents`, `/fast`, `/yolo` и т.д.
не выполняются: LLM просто галлюцинирует правдоподобный ответ.

**Что меняет:** перед `_run_agent` проверяем, начинается ли последнее
user-сообщение со `/`. Если резолвится через `hermes_cli.commands.resolve_command`
(и не `cli_only`), строим синтетический `MessageEvent(MessageType.COMMAND,
source=API_SERVER, internal=True)` и вызываем `self._message_handler(_evt)` —
тот же путь, что Telegram/Discord/Slack. Ответ оборачивается в OpenAI
chat-completion shape и возвращается. Если что-то падает — лог + fall-through
к обычному LLM-пути.

`internal=True` нужен чтобы обойти gateway-авторизацию (мы уже аутентифицированы
по API_SERVER_KEY на уровне `_check_auth`).

**Применение к живым контейнерам без ребилда:**

```bash
docker cp patches/api_server.py hermes_user_<id>:/opt/hermes/gateway/platforms/api_server.py
docker restart hermes_user_<id>
```

Бэкап оригинала перед перезаписью кладётся в `/tmp/api_server.py.bak-saas-<ts>`.

**Проверка:**

```bash
KEY=$(grep API_SERVER_KEY_<id> .env.saas | cut -d= -f2)
curl -s http://localhost:<port>/v1/chat/completions \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"model":"hermes-agent","messages":[{"role":"user","content":"/status"}]}' \
  | jq '.choices[0].message.content'
```

Должен вернуться реальный `📊 **Hermes Gateway Status**...`, а не выдуманный
LLM-ответ.

**Если апстрим api_server.py поменяется:** перечитать diff, обновить точку
вставки в патче. Якорь — строка `# history already set from request body above`
сразу перед `completion_id = f"chatcmpl-..."`. Оригинал лежит в
`api_server.py.original` для diff'а.
