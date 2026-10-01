# Fatima Macias — Landing Page

Static professional landing page (plain HTML/CSS/JS, no frameworks), deployed as
a **Cloudflare Workers** static site (Workers with Static Assets).

## Structure

```
public/                     # Everything in here is served as the site root
  index.html                # Main page in ENGLISH (fatimacias.com)
  es/index.html              # SPANISH version (fatimacias.com/es/)
  assets/styles.css         # Shared styles (VS Code Dark+/Light+ theme, liquid glass)
  assets/script.js          # Shared interactivity (mobile menu, animations, modal, theme)
  assets/fonts/              # Self-hosted fonts (Inter + JetBrains Mono, woff2) — no external CDN
  assets/favicon.svg         # Favicon ("FM" logo)
  assets/og-image.png        # Social media preview image (1200×630)
  robots.txt                 # Crawler directives + sitemap reference
  sitemap.xml                 # Sitemap with hreflang annotations (en/es)
wrangler.jsonc              # Cloudflare Workers config (points to public/ as assets.directory)
package.json                 # Dev dependency on Wrangler, used by Workers Builds CI
```

The domain's primary language is **English** (`/`). The Spanish version lives at
`/es/`. Wrangler serves both routes automatically with no extra configuration,
thanks to the `index.html` files inside each folder and the default
`auto-trailing-slash` HTML handling.

The entire site (CSS, JS, fonts, favicon) is 100% self-hosted — no dependency on
external CDNs (e.g. Google Fonts), so everything is served from Cloudflare's own
network.

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
> `public/index.html`, `public/es/index.html`, `public/robots.txt`, and
> `public/sitemap.xml`.

After deploying, it's recommended to:
1. Verify domain ownership in [Google Search Console](https://search.google.com/search-console)
   and submit `https://fatimacias.com/sitemap.xml`.
2. Test the social preview with the [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/)
   or the [X/Twitter Card Validator](https://cards-dev.twitter.com/validator).

## Viewing the site locally

Requires Node.js (for Wrangler, Cloudflare's CLI). Install dependencies once,
then run the dev server — it replicates production routing exactly (trailing
slashes, 404s, asset serving):

```bash
npm install
npm run dev
```

Then visit the local URL Wrangler prints (typically `http://localhost:8787`).

## Deploying to Cloudflare Workers (free)

1. Go to your [Cloudflare dashboard](https://dash.cloudflare.com/) → **Workers & Pages**.
2. Select **Create application** → **Get started** next to **Import a repository**.
3. Choose the **fatimacias/fatimacias** Git repository.
4. Build configuration (Cloudflare should auto-detect these from `wrangler.jsonc`):
   - **Build command**: (empty — no build step needed)
   - **Deploy command**: `npx wrangler deploy` (default)
5. Make sure the Worker name on the dashboard matches `"name"` in
   `wrangler.jsonc` (currently `fatimacias`) — Cloudflare requires this match
   for Git-connected deploys.
6. Save and deploy. Cloudflare will give you a free URL like
   `https://fatimacias.<your-subdomain>.workers.dev`.
7. Connect your custom domain from **Settings** → **Domains & Routes** on the
   Worker.

### Manual deploy (without Git integration)

```bash
npm install
npx wrangler login   # one-time authentication
npm run deploy
```

## Notes

- 100% static site, no backend or forms — contact happens via direct links
  (email, phone, LinkedIn).
- `node_modules/` and `.wrangler/` are git-ignored; only `package.json`,
  `package-lock.json`, and `wrangler.jsonc` are committed.
- Any change inside `public/` is automatically reflected in the next
  deployment after pushing to the connected branch.


