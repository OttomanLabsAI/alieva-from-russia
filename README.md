# Russian with Nastya

The landing site for **Russian with Nastya** — Comprehensible-Input Russian
courses, PDF guides, speaking clubs and 1-on-1 lessons.

It is a plain static site: no framework, no build step. The files in `public/`
*are* the site, served by a Cloudflare Workers static-assets deployment.

## Structure

```
public/
  index.html            the landing page
  404.html              themed not-found page
  offer.html            the OttomanLabs.AI offer page (nav tab "My offer")
  vocab/                the Russian Vocabulary Builder app (nav tab "Russian vocab"),
                        vendored from OttomanLabsAI/RussianVocab and rehomed to /vocab/
  favicon.svg           blue "Р" mark, matching the site
  robots.txt
  _headers              security headers + caching rules
  assets/
    css/site.css        the page stylesheet
    css/404.css         styles used only by the 404 page
    css/offer.css       styles used only by the offer page
    js/site.js          mobile navigation toggle
wrangler.jsonc          assets-only Worker config
package.json            wrangler devDependency + scripts
```

## Local development

```bash
npm install
npm run dev        # wrangler dev, serves public/ locally
npm run check      # wrangler deploy --dry-run, validates the config
```

To render the pages and screenshot them at desktop and mobile widths:

```bash
python3 scripts/render_check.py --dir public
```

(That script lives with the tooling, not in this repo; any static server works
just as well — `python3 -m http.server --directory public`.)

## Deployment

The repository is connected to **Cloudflare Workers Builds**, so every push to
`main` deploys to production. Nothing outside `public/` is served.

Manual deploy, if ever needed:

```bash
npm run deploy
```

## External resources

The page intentionally loads a few things from other origins. They are left as
absolute URLs because they are not ours to host:

- **Google Fonts** — `Unbounded` and `Golos Text`, from `fonts.googleapis.com`
  and `fonts.gstatic.com`.
- **Portrait photography** — served from `thb.tildacdn.ink` (the images from the
  original Tilda site). Both `<img>` tags carry an `onerror` fallback so the
  layout survives if the CDN ever drops them.
- **Checkout and community links** — `app.lava.top`, `boosty.to`.
- **Legal pages** — Terms and Privacy still live on the old Tilda domain.

If the Tilda CDN is ever retired, the portraits should be re-uploaded into
`public/assets/img/` and the two `<img src>` values pointed at them.

## The tabs

The nav is three tabs plus the free-lesson button: **Website** (the landing
page), **Russian vocab** (the vocabulary app at `/vocab/`), and **My offer**
(`offer.html` - the OttomanLabs.AI flyer rebuilt in the site's own design
language, with a before/after comparison against the original page, which it
links to at `https://alievafromrussia.tilda.ws/`). The offer page is
`noindex`ed; it and the vocab tab come out as their own release when the site
transfers to the owner.

## The vocab app

`public/vocab/` is the Russian Vocabulary Builder from the
`OttomanLabsAI/RussianVocab` repo, served as-is apart from rehoming: absolute
paths gained the `/vocab/` prefix (including the service-worker registration
and its network-first list), and share links became `/vocab/?s=CODE` because
the `/s/CODE` form needs the SPA fallback this site doesn't use. Its Firebase
sign-in keys ship in `vocab/config.js`; without network access the app runs in
device-only mode. Update it by re-copying from the source repo and re-applying
those rewrites.

## Notes

`robots.txt` allows everything and lists no sitemap — the site is a single page,
so there is nothing to index beyond `/`.
