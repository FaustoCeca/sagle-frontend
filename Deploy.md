# Deploy del frontend

El frontend (Vite + React) se despliega en **Vercel**. El backend corre aparte en Docker
sobre el VPS y se expone en `https://api.thesagle.com` (ver repo `sagle-backend`).

```
                 ┌────────────────────────── Vercel ──────────────────────────┐
push a main ───► │  build (npm run build) ─► dist/ ─► servido por la CDN global │ ──► https://thesagle.com
                 └─────────────────────────────────────────────────────────────┘
                                         │  el browser llama a la API
                                         ▼
                              https://api.thesagle.com  (backend en Docker, VPS)
```

## Cómo funciona el deploy (el flujo)

1. **Conectamos el repo de GitHub a Vercel** una sola vez. A partir de ahí Vercel "observa"
   la rama `main`.
2. Cada **push a `main`** dispara automáticamente: Vercel clona el repo, corre
   `npm install` + `npm run build` (Vite genera la carpeta `dist/`) y publica ese `dist/`
   en su **CDN global**. Es un deploy **atómico**: si el build falla, el sitio actual no se
   toca; si sale bien, se cambia de golpe (con rollback de un clic).
3. Las otras ramas generan **preview deployments** (una URL `*.vercel.app` por rama/commit)
   para revisar antes de mergear.

No hace falta ningún servidor propio para el front: Vercel se encarga del build, el hosting
estático, el HTTPS y la CDN.

## Variables de entorno

El frontend solo necesita saber **a qué API pegarle**. Eso vive en `.env.production`
(commiteado), que Vite usa automáticamente en `vite build`:

```bash
# .env.production
VITE_API_URL=https://api.thesagle.com
```

- Las variables `VITE_*` se **hornean en el bundle** en tiempo de build (terminan en el JS
  del cliente) → **nunca poner secretos acá**. La URL de la API es pública, así que va bien.
- `.env` (local) apunta a `http://localhost:3001` para desarrollo y está en `.gitignore`.
- Precedencia de Vite en build de producción: `.env.production` gana sobre `.env`.
- **AdSense:** está apagado a propósito. Para encenderlo (cuando haya un slot real), agregar
  `VITE_NODE_ENV=production` a `.env.production` y reemplazar el slot en `src/SagleApp.tsx`.

> También se pueden definir/overridear estas variables en Vercel (Project → Settings →
> Environment Variables), pero con `.env.production` commiteado no hace falta.

## Configuración del proyecto en Vercel

Al importar el repo (`Add New → Project`), Vercel detecta Vite y usa estos defaults:

| Opción | Valor |
|--------|-------|
| Framework Preset | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Root Directory | `./` (este repo ES el frontend, no es monorepo) |

Es un **SPA de una sola ruta**, así que no hace falta `vercel.json` ni reglas de rewrite.

## Cómo funcionan los DNS (y por qué hay que cambiarlos)

Un dominio (`thesagle.com`) por sí solo no sabe a qué servidor ir: eso lo definen sus
**registros DNS**, que se administran en un proveedor (en nuestro caso, **DigitalOcean** —
los nameservers son `ns1/ns2/ns3.digitalocean.com`). Tipos de registro que usamos:

- **A** — apunta un nombre a una **dirección IP**. Ej: `api.thesagle.com → 146.190.147.241`.
- **CNAME** — apunta un nombre a **otro nombre** (alias). Ej: `www → cname.vercel-dns.com`.

Para que `thesagle.com` lo sirva **Vercel** (y no el VPS), hay que apuntar el dominio a
Vercel. Como DigitalOcean (y el estándar DNS) **no permite CNAME en el apex** (el dominio
"pelado" `thesagle.com`), el apex va por **A** a la IP de Vercel, y el `www` por **CNAME**.

### Registros de `thesagle.com` (en el panel DNS de DigitalOcean)

| Host | Tipo | Valor | Para qué |
|------|------|-------|----------|
| `@` (apex) | A | el que indique Vercel (típico `76.76.21.21`) | el sitio → **Vercel** |
| `www` | CNAME | `cname.vercel-dns.com.` | `www` → **Vercel** |
| `api` | A | `146.190.147.241` | la API → **VPS** (⚠️ **NO TOCAR**) |

Pasos:
1. En Vercel: Project → **Settings → Domains** → agregar `thesagle.com` y `www.thesagle.com`.
   Vercel muestra los valores exactos a usar.
2. En DigitalOcean: **Networking → Domains → thesagle.com** → editar el A de `@` y el de
   `www` a los valores de Vercel. **Dejar `api` como está.**
3. Esperar la propagación (minutos a un par de horas). Vercel emite el **certificado HTTPS
   solo** una vez que el dominio resuelve hacia él.

> El backend valida CORS contra una lista exacta (`https://thesagle.com`,
> `https://www.thesagle.com`). Por eso el sitio funciona del todo recién cuando se sirve
> desde el dominio real; desde una URL `*.vercel.app` las llamadas a la API dan error de
> CORS (a menos que se agregue esa URL temporalmente a `CORS_ORIGIN` en el backend).

## Deploy manual con Vercel CLI (opcional)

Si en algún momento querés deployar sin pasar por GitHub:

```bash
npm i -g vercel
vercel login
vercel --prod        # buildea y publica a producción
```

---

## (Legacy) Método viejo — VPS + Nginx estático — DEPRECADO

Antes el front se buildeaba y se copiaba a mano a `/var/www/thesagle-frontend/<entorno>/dist`
servido por Nginx en el VPS. **Ya no se usa** (lo reemplazó Vercel). Se deja como referencia
histórica:

```
# En el VPS, dentro de la carpeta del entorno (staging/prod):
git pull
npm install
npm run build
rm -rf /var/www/thesagle-frontend/<entorno>/dist/*
cp -r dist/* /var/www/thesagle-frontend/<entorno>/dist/
sudo systemctl restart nginx
```
