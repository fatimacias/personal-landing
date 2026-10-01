# Fatima Macias — Landing Page

Landing page profesional estático (HTML/CSS/JS plano, sin frameworks), listo para
desplegarse gratis en **Cloudflare Pages**.

## Estructura

```
index.html        # Página principal en INGLÉS (fatimacias.com)
es/index.html     # Versión en ESPAÑOL (fatimacias.com/es/)
assets/styles.css # Estilos compartidos (tema oscuro con acentos degradados)
assets/script.js  # Interactividad compartida (menú móvil, animaciones, año del footer)
```

El idioma principal del dominio es **inglés** (`/`). La versión en español vive en
`/es/`. Cloudflare Pages sirve ambas rutas automáticamente sin configuración extra,
gracias a los archivos `index.html` dentro de cada carpeta.

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
