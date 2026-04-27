---
title: "Image Bank"
type: index
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.670330Z
---

# Image Bank

Stock photography for SettleMint presentations. Organized by category.

## Folder Structure

```
image-bank/
  abstract/       ← Gradient, data-viz, geometric, wave, network imagery
  business/       ← People, meetings, office, handshake, team
  city/           ← Skylines and architectural shots (London, Dubai, Singapore, etc.)
  fintech/        ← Finance, trading, payments, blockchain, digital banking
  technology/     ← Code, dashboards, cloud, servers, security
```

## Current Inventory

### abstract/ (5 images)
- `data-viz.jpg`
- `geometric.jpg`
- `gradient.jpg`
- `network.jpg`
- `waves.jpg`

### business/ (5 images)
- `handshake.jpg`
- `meeting.jpg`
- `office.jpg`
- `presentation.jpg`
- `team.jpg`

### city/ (5 images)
- `dubai.jpg`
- `london.jpg`
- `modern-building.jpg`
- `singapore.jpg`
- `skyline.jpg`

### fintech/ (5 images)
- `analytics.jpg`
- `blockchain.jpg`
- `digital-banking.jpg`
- `payments.jpg`
- `trading.jpg`

### technology/ (5 images)
- `cloud.jpg`
- `code.jpg`
- `dashboard.jpg`
- `security.jpg`
- `server-room.jpg`

---

## Image Standards

- **Minimum resolution**: 1920×1080 (Full HD)
- **Preferred format**: JPG
- **Color profile**: sRGB
- **Orientation**: Landscape (16:9) preferred for full-bleed slides
- **File naming**: `lowercase-with-hyphens.jpg`

---

## Adding Images

### Manual
Drop files directly into the appropriate category subfolder. Follow naming conventions above.

### Via Pexels API (recommended for bulk downloads)

Source: [https://www.pexels.com](https://www.pexels.com)  
API docs: [https://www.pexels.com/api/](https://www.pexels.com/api/)  
Base URL: `https://api.pexels.com/v1/`

**Quick example — search and download:**
```bash
# Search for images
curl -H "Authorization: YOUR_PEXELS_API_KEY" \
  "https://api.pexels.com/v1/search?query=blockchain+technology&per_page=10&orientation=landscape" \
  | jq '.photos[] | .src.original'

# Download a specific image
curl -L "IMAGE_URL" -o image-bank/technology/blockchain-2.jpg
```

**Key parameters:**
- `query` — search term
- `orientation=landscape` — always use this for slide images
- `size=large` — 1920px+ width
- `per_page` — up to 80 per request
- `.src.large2x` — 1880px wide (use this for slides)
- `.src.original` — full resolution

**Rate limits**: 200 requests/hour, 20,000/month on free tier.

---

## DALP Screenshots (Separate)

DALP platform UI screenshots live in `templates/dalp-screenshots/`, NOT here.  
See `templates/dalp-screenshots/README.md` for the catalog.
