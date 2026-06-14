# Installation: BUSINESS_IDEA_FIREWORK_DAILY

Datum: 2026-06-01
Status: installed

## Installed Job

```text
id: a2b7ea142ade
name: BUSINESS_IDEA_FIREWORK_DAILY
schedule: 30 9 * * *
deliver: telegram
enabled: True
state: scheduled
next_run_at: 2026-06-02T09:30:00+02:00
workdir: /Users/zondrius/hermes-workspace
skills: hermes-agent-operating-system, hermes-decision-inbox
```

## Backup

Created before editing:

```text
/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260601-2140-before-business-idea-firework
```

## Verification

Hermes cron list showed the job as active:

```text
a2b7ea142ade [active]
Name:      BUSINESS_IDEA_FIREWORK_DAILY
Schedule:  30 9 * * *
Next run:  2026-06-02T09:30:00+02:00
Deliver:   telegram
Skills:    hermes-agent-operating-system, hermes-decision-inbox
Workdir:   /Users/zondrius/hermes-workspace
```

Prompt checks:

```text
prompt_has_5: True
prompt_has_safety: True
```

## Rollback

To roll back this install, restore the backup:

```text
cp /Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260601-2140-before-business-idea-firework /Users/zondrius/.hermes/profiles/neva/cron/jobs.json
```
