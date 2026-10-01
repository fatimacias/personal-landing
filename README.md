# Fatima Macias — Landing Page

Static professional landing page (plain HTML/CSS/JS, no frameworks), ready to
deploy for free on **Cloudflare Pages**.

## Structure

```
index.html          # Main page in ENGLISH (fatimacias.com)
es/index.html        # SPANISH version (fatimacias.com/es/)
assets/styles.css    # Shared styles (VS Code Dark+/Light+ theme, liquid glass)
assets/script.js     # Shared interactivity (mobile menu, animations, modal, theme)
assets/fonts/        # Self-hosted fonts (Inter + JetBrains Mono, woff2) — no external CDN
assets/favicon.svg   # Favicon ("FM" logo)
assets/og-image.png  # Social media preview image (1200×630)
robots.txt           # Crawler directives + sitemap reference
sitemap.xml          # Sitemap with hreflang annotations (en/es)
```

The domain's primary language is **English** (`/`). The Spanish version lives at
`/es/`. Cloudflare Pages serves both routes automatically with no extra
configuration, thanks to the `index.html` files inside each folder.

The entire site (CSS, JS, fonts, favicon) is 100% self-hosted — no dependency on
external CDNs (e.g. Google Fonts), so everything is served from Cloudflare's own
CDN.

## SEO

- **Meta tags**: `description`, `robots`, `canonical`, Open Graph, and Twitter
  Card on both pages (`index.html` and `es/index.html`).
- **hreflang**: each page announces its language alternates (`en`, `es`,
  `x-default`) so search engines correctly index both versions of the same
  content.
- **JSON-LD** (`schema.org/Person`): structured data with name, role, URL,
  LinkedIn, and location.
- **`robots.txt`** and **`sitemap.xml`**: allow full crawling and include
  per-URL hreflang annotations.

> ⚠️ All URLs in the meta tags, sitemap, and JSON-LD assume the domain
> `https://fatimacias.com`. If the final domain is different, update it in:
> `index.html`, `es/index.html`, `robots.txt`, and `sitemap.xml`.

After deploying, it's recommended to:
1. Verify domain ownership in [Google Search Console](https://search.google.com/search-console)
   and submit `https://fatimacias.com/sitemap.xml`.
2. Test the social preview with the [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/)
   or the [X/Twitter Card Validator](https://cards-dev.twitter.com/validator).

## Viewing the site locally

No build step or dependencies required. Just open `index.html` in a browser,
or serve it with any static server, for example:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploying to Cloudflare Pages (free)

1. Go to your [Cloudflare dashboard](https://dash.cloudflare.com/) → **Workers & Pages**.
2. Create a new project → **Connect to Git** → select this repository
   (`fatimacias/fatimacias`).
3. Build configuration:
   - **Framework preset**: None
   - **Build command**: (empty)
   - **Build output directory**: `/`
4. Save and deploy. Cloudflare will give you a free URL like
   `https://fatimacias.pages.dev`.
5. (Optional, once you have a domain) connect a custom domain from the
   **Custom domains** tab of the Cloudflare Pages project.

## Notes

- 100% static site, no backend or forms — contact happens via direct links
  (email, phone, LinkedIn).
- Any change to `index.html`, `styles.css`, or `script.js` is automatically
  reflected in the next deployment after pushing to the connected branch.

