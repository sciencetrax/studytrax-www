---
name: imagery
description: Find stock photos, icons, and generate AI images (Unsplash, Pexels, Pixabay, Iconify, Inliner.ai)
user-invocable: true
---

# Imagery Skill

Find and generate images for any project. **Zero AI tokens for searches.**

## Usage

```
/imagery <command> [subcommand] [args...]
```

## Script Location

`~/dotfiles/scripts/imagery/imagery-cli.sh`

## Commands

### AI Generated Images (Inliner.ai)

No API key needed. Images cached on CDN after first generation.

```bash
/imagery ai generate "sunset over mountains"
/imagery ai styled "happy dog" "watercolor" "landscape"
/imagery ai styled "tech startup logo" "minimalist" "square"
```

**Styles:** realistic, cartoon, watercolor, oil-painting, sketch, minimalist, 3d-render, pixel-art, anime

### Stock Photos

#### Unsplash (requires API key)
```bash
/imagery unsplash search "office workspace" 5 landscape
/imagery unsplash random "nature" 3
/imagery unsplash download <photo_id> ./photo.jpg
```

#### Pexels (requires API key)
```bash
/imagery pexels search "technology" 10
/imagery pexels curated 5
/imagery pexels video "ocean waves" 3
```

#### Pixabay (requires API key)
```bash
/imagery pixabay search "business" 10 photo
/imagery pixabay search "arrow" 5 vector
/imagery pixabay video "city traffic" 5
```

### Icons (Iconify)

No API key needed. 275,000+ icons from 200+ sets.

```bash
/imagery icon search "arrow"           # Search all sets
/imagery icon get "mdi:home" 32        # Get icon URL
/imagery icon get "fa6-solid:star" 24 "#3b82f6"  # With color
/imagery icon download "mdi:home" ./home.svg 48
/imagery icon sets                     # List popular sets
/imagery icon browse "mdi"             # Browse a set
```

**Popular icon sets:**
- `mdi` - Material Design Icons (7000+)
- `fa6-solid` / `fa6-regular` - Font Awesome 6
- `lucide` - Lucide icons
- `heroicons` - Heroicons
- `tabler` - Tabler icons
- `ph` - Phosphor icons

### Multi-Source Search

Search all sources at once:

```bash
/imagery search "nature" 5
```

Returns results from: Icons, Unsplash, Pexels, and AI-generated URL.

## Requirements

- **jq** - JSON processor (install: `curl -sL -o ~/bin/jq.exe https://github.com/jqlang/jq/releases/download/jq-1.7.1/jq-windows-amd64.exe`)
- **curl** - HTTP client (usually pre-installed)

## Config

Add API keys to `~/etc/config.json`:

```json
{
  "imagery": {
    "unsplash": "your-unsplash-access-key",
    "pexels": "your-pexels-api-key",
    "pixabay": "your-pixabay-api-key",
    "inliner_project": "your-project-name"
  }
}
```

**Get API keys:**
- Unsplash: https://unsplash.com/developers (free)
- Pexels: https://www.pexels.com/api/ (free)
- Pixabay: https://pixabay.com/api/docs/ (free)
- Inliner.ai: https://inliner.ai (25 free images)

## Output Format

All commands return JSON with:
- `provider` - Source (unsplash, pexels, pixabay, iconify, inliner.ai)
- `type` - Content type (stock-photo, icon, ai-generated, video)
- `results` - Array of items with URLs

## Use Cases

| Need | Command |
|------|---------|
| Hero image for website | `/imagery unsplash search "abstract technology" 5 landscape` |
| Product placeholder | `/imagery pexels search "product mockup" 10` |
| Icon for button | `/imagery icon get "mdi:arrow-right" 24` |
| Custom illustration | `/imagery ai generate "isometric office workspace, flat design"` |
| Logo concept | `/imagery ai styled "letter A logo" "minimalist" "square"` |
| Social media graphic | `/imagery ai styled "coffee shop vibe" "warm tones" "square"` |
| Video background | `/imagery pexels video "abstract motion" 5` |
| Vector graphic | `/imagery pixabay search "business icons" 10 vector` |

## Agent Integration

When an agent needs imagery:

1. **For quick searches** - Use `/imagery` skill (no AI tokens)
2. **For complex selection** - Agent reviews results and picks best
3. **For custom generation** - Use Inliner.ai with specific prompts

Example agent workflow:
```
1. /imagery search "team collaboration" 10
2. Agent reviews results, picks best match
3. /imagery unsplash download <id> ./team-photo.jpg
```

## Execution

When user invokes `/imagery`, run:

```bash
bash ~/dotfiles/scripts/imagery/imagery-cli.sh $ARGS
```

Pass all arguments after `/imagery` directly to the script. Output the JSON response.
