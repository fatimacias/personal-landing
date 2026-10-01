# Fatima Macias — Landing Page

Landing page profesional estático (HTML/CSS/JS plano, sin frameworks), listo para
desplegarse gratis en **Cloudflare Pages**.

## Estructura

```
index.html          # Página principal en INGLÉS (fatimacias.com)
es/index.html        # Versión en ESPAÑOL (fatimacias.com/es/)
assets/styles.css    # Estilos compartidos (tema VS Code Dark+/Light+, liquid glass)
assets/script.js     # Interactividad compartida (menú móvil, animaciones, modal, tema)
assets/fonts/        # Fuentes self-hosted (Inter + JetBrains Mono, woff2) — sin CDN externo
assets/favicon.svg   # Favicon (logo "FM")
assets/og-image.png  # Imagen de vista previa para redes sociales (1200×630)
robots.txt           # Directivas para crawlers + referencia al sitemap
sitemap.xml          # Sitemap con anotaciones hreflang (en/es)
```

El idioma principal del dominio es **inglés** (`/`). La versión en español vive en
`/es/`. Cloudflare Pages sirve ambas rutas automáticamente sin configuración extra,
gracias a los archivos `index.html` dentro de cada carpeta.

Todo el sitio (CSS, JS, fuentes, favicon) es 100% self-hosted — ninguna dependencia
de CDNs externos (ej. Google Fonts), para que todo se sirva desde el propio CDN de
Cloudflare.

## SEO

- **Meta tags**: `description`, `robots`, `canonical`, Open Graph y Twitter Card en
  ambas páginas (`index.html` y `es/index.html`).
- **hreflang**: cada página anuncia sus alternativas de idioma (`en`, `es`,
  `x-default`) para que los buscadores indexen correctamente ambas versiones del
  mismo contenido.
- **JSON-LD** (`schema.org/Person`): datos estructurados con nombre, rol, URL,
  LinkedIn y ubicación.
- **`robots.txt`** y **`sitemap.xml`**: permiten rastreo completo e incluyen las
  anotaciones hreflang por URL.

> ⚠️ Todas las URLs en las meta tags, el sitemap y el JSON-LD asumen el dominio
> `https://fatimacias.com`. Si el dominio final es otro, hay que actualizarlo en:
> `index.html`, `es/index.html`, `robots.txt` y `sitemap.xml`.

Tras desplegar, se recomienda:
1. Verificar la propiedad del dominio en [Google Search Console](https://search.google.com/search-console)
   y enviar `https://fatimacias.com/sitemap.xml`.
2. Probar la vista previa social con la [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/)
   o la [Card Validator de X/Twitter](https://cards-dev.twitter.com/validator).

## Ver el sitio localmente

No requiere build ni dependencias. Basta con abrir `index.html` en el navegador,
o servirlo con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8080
```

Luego visita `http://localhost:8080`.

## Desplegar en Cloudflare Pages (gratis)

1. Entra a tu [dashboard de Cloudflare](https://dash.cloudflare.com/) → **Workers & Pages**.
2. Crea un nuevo proyecto → **Connect to Git** → selecciona este repositorio
   (`fatimacias/fatimacias`).
3. Configuración de build:
   - **Framework preset**: None
   - **Build command**: (vacío)
   - **Build output directory**: `/`
4. Guarda y despliega. Cloudflare te dará una URL gratuita tipo
   `https://fatimacias.pages.dev`.
5. (Opcional, cuando compres un dominio) conecta un dominio personalizado desde la
   pestaña **Custom domains** del proyecto en Cloudflare Pages.

## Notas

- Sitio 100% estático, sin backend ni formularios — el contacto se hace mediante
  enlaces directos (email, teléfono, LinkedIn).
- Cualquier cambio en `index.html`, `styles.css` o `script.js` se refleja
  automáticamente en el siguiente despliegue tras hacer push a la rama conectada.

