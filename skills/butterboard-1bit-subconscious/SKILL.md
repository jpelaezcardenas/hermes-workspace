---
name: butterboard-1bit-subconscious
description: Operate the Butterboard 1-bit silent-partner monitor: a private, low-noise BitNet/1.58-bit subconscious that observes recent conversations and writes concise suggestions for Faust only when useful.
---

# Butterboard 1-bit Subconscious

Script: `scripts/butterboard_1bit_silent_partner.py`.
Default local state: `~/.hermes/profiles/faust/memory/bitnet_subconscious_suggestions.md`.
Railway/Butterboard env knobs:

- `BUTTER_1BIT_SILENT_PARTNER_ENABLED=true`
- `BUTTER_1BIT_SILENT_PARTNER_MODE=silent_suggestions`
- `BUTTER_1BIT_SILENT_PARTNER_MODEL=BitNet-b1.58-2B-4T`
- `BUTTER_1BIT_SILENT_PARTNER_TARGET=faust`

Behavior contract:
1. Never speak directly to the user.
2. Never send external messages or mutate user data.
3. Monitor only recent local/Hermes conversation text available to the service.
4. Emit a suggestion only when there is a concrete risk, missed opportunity, contradiction, or useful next step.
5. Write private suggestions for Faust AGI; Faust decides whether to use them.
6. Stay silent on routine turns.
