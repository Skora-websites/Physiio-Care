# Restore the live site: physiocare-letsplayzone.com

This runbook restores the live website after its backend became unreachable
(the site shows **"Failed to load data."** on every content page).

## 1. Diagnosis (verified)

| Check | Result |
|---|---|
| Deployed frontend bundle calls | `https://api.physiocare-letsplayzone.com/api` (URL baked into `index-*.js`) |
| DNS for `api.physiocare-letsplayzone.com` | **No record** — hostname does not resolve, so every API request dies at DNS |
| Old developer's API (`api.sudarshandev.online`) | Down (Apache 503) and **not accessible** to us — irrelevant now |
| MongoDB (`cluster0.djwdzz9.mongodb.net/twoinone`) | **Reachable and fully intact** — old Atlas credentials in `twoinone-backend-main/.env` still work (verified 2026-09-04) |
| Uploaded media | Present in this repo at `twoinone-backend-main/public/uploads/` (~80 images/videos) |

Two code bugs were also found and are **already fixed in this repo**:

1. `src/components/VideoShowcase.jsx` hardcoded `http://localhost:5001/...`. On
   the HTTPS live site the browser **blocks that mixed-content request**, so the
   video showcase never loaded. It now uses `import.meta.env.VITE_API_URL`.
2. `src/admin/pages/VideoShowcaseAdmin.jsx` had an unused
   `http://localhost:5001` constant (removed).
3. Backend CORS (`twoinone-backend-main/src/server.js`) sent
   `origin: '*'` **with** `credentials: true` — a combination browsers reject.
   Now `credentials` is only enabled when `CLIENT_URL` is set (production),
   while local dev keeps open CORS without credentials.

A **fresh production build with the fixes is ready** in `dist/` (new bundle
`assets/index-BubO66Ev.js` — verified to contain the production API URL).

### Verified database state (from `node deploy/db-check.cjs`)

```
COLLECTION        DOCS
abouts            1
admins            2
blogs             3
galleries         5
leads             4
pzabouts          1
pzactivities      5
pzgalleries       14
pzservices        3
services          12
videos            7
videoshowcases    2
```

(`blogs` has no API routes in this backend snapshot — harmless, leave it.)

---

## 2. What you need

- Access to the **Hostinger DNS zone** for `physiocare-letsplayzone.com`
  (the domain uses Hostinger's nameservers: `*.dns-parking.com`).
- **SSH access** to the VPS `200.141.12.91` (root or a sudo user).
- Access to **MongoDB Atlas** (only needed to allow-list the VPS IP).

---

## 3. Step 1 — Add the DNS record (Hostinger panel)

1. Log in to Hostinger → **Domains** → select `physiocare-letsplayzone.com` →
   **DNS / Nameservers** → **DNS records**.
2. Add an **A record**:
   - **Type:** `A`
   - **Name/Host:** `api`
   - **Points to:** `200.141.12.91`
   - **TTL:** 300
3. Wait a few minutes, then verify from your own machine:

```bash
nslookup api.physiocare-letsplayzone.com
# should print: Address: 200.141.12.91
```

> ⚠️ Until this record resolves, the browser shows
> `net::ERR_NAME_NOT_RESOLVED` in the console — nothing to fix in code.

---

## 4. Step 2 — Allow the VPS in Atlas

MongoDB Atlas only accepts connections from allow-listed IPs.

1. Atlas → **Network Access** → **IP Access List** → **Add IP Address**.
2. Add the VPS public IP: `200.141.12.91/32`
   (if you prefer no allow-list friction, `0.0.0.0/0` also works, at the cost
   of open DB access — not recommended).

---

## 5. Step 3 — Upload the backend to the VPS

From a terminal on your machine, inside this repo (this excludes
`node_modules` and puts the code at `/opt/twoinone-backend`):

```bash
tar czf - --exclude node_modules twoinone-backend-main \
  | ssh root@200.141.12.91 'tar xzf - -C /opt && mv -fT /opt/twoinone-backend-main /opt/twoinone-backend'
```

No `tar` on Windows Git Bash? Plain scp works too — if `node_modules/` rides
along, just delete it on the server before reinstalling (`rm -rf
/opt/twoinone-backend/node_modules`). If you upload with a file manager/SFTP
instead, make sure `public/uploads/` comes along and `node_modules/` does not.

Then on the VPS:

```bash
# 1. Ensure Node 20+ is installed
node -v    # if missing or < 20, install Node 22 LTS, e.g.:
#   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs

# 2. Install production dependencies (package-lock.json is included)
cd /opt/twoinone-backend
npm install --omit=dev

# 3. Create the production .env (see deploy/backend.env.production.example)
#    COPY the real MONGO_URI and JWT_SECRET from the repo's
#    twoinone-backend-main/.env — the secret MUST stay the same, or the
#    frontend's stored admin logins will be rejected.
#    Set: PORT=5001  NODE_ENV=production  CLIENT_URL=https://physiocare-letsplayzone.com
sudo nano .env
```

> The uploaded media already lives in `/opt/twoinone-backend/public/uploads/`,
> so gallery/service images will display immediately — nothing to copy.
>
> `CLIENT_URL` is what makes the backend send `Access-Control-Allow-Origin:
> https://physiocare-letsplayzone.com` together with credentials. Without it the
> CORS fix in server.js sends an open `*` (no credentials), which still works
> for public content but is not the production setup.

---

## 6. Step 4 — Run the backend with pm2

```bash
# Install pm2 if needed (on the server)
sudo npm install -g pm2

# Upload the pm2 config from this repo (from your machine)
scp deploy/ecosystem.config.cjs root@200.141.12.91:/opt/twoinone-backend/ecosystem.config.cjs

# Start it (on the server)
cd /opt/twoinone-backend
pm2 start ecosystem.config.cjs
# (Equivalent one-liner without the config file:)
#   pm2 start src/server.js --name twoinone-api --cwd /opt/twoinone-backend

pm2 save            # freeze the process list
pm2 startup         # prints a command — run it so pm2 survives reboots
pm2 status          # twoinone-api should be "online"
pm2 logs twoinone-api   # expect: "Server running in production mode on port 5001"
```

The backend's `.env` is loaded automatically because `dotenv.config()` reads
`<cwd>/.env` and pm2 runs with `cwd = /opt/twoinone-backend`.

---

## 7. Step 5 — nginx reverse proxy + HTTPS for the API

The repo ships a ready config: **`deploy/api.physiocare-letsplayzone.com.nginx.conf`**.

Upload it from your machine, then install it on the server:

```bash
# From your machine:
scp deploy/api.physiocare-letsplayzone.com.nginx.conf \
    root@200.141.12.91:/etc/nginx/sites-available/api.physiocare-letsplayzone.com

# On the server:
sudo ln -s /etc/nginx/sites-available/api.physiocare-letsplayzone.com \
           /etc/nginx/sites-enabled/api.physiocare-letsplayzone.com

sudo nginx -t && sudo systemctl reload nginx

# Provision a TLS certificate (rewrites the config with real cert paths):
sudo certbot --nginx -d api.physiocare-letsplayzone.com
```

Open ports if a firewall is active:

```bash
sudo ufw allow 'Nginx Full'
```

Do **not** touch the existing main-site nginx config.

---

## 8. Step 6 — Deploy the fixed frontend build

The rebuilt site is ready in this repo at **`dist/`** (new asset
`assets/index-BubO66Ev.js`; the live site currently serves the old
`index-CoTw7gos.js`). Upload it to the web root that serves
`physiocare-letsplayzone.com`.

1. Find the main site's document root on the VPS:

```bash
grep -r "root " /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null
# note the directory that belongs to the physiocare-letsplayzone.com server block
```

2. Back up the current site, then upload the new build from your machine:

```bash
# On the server:
cp -a /var/www/physiocare /var/www/physiocare.bak-$(date +%F)   # adjust path

# From your machine (replace <WEBROOT> with the path from step 1):
cd dist
tar czf - . | ssh root@200.141.12.91 'tar xzf - -C <WEBROOT> --overwrite'
```

3. If the site is not served by plain nginx from a folder (e.g. it was
   deployed through a panel or another tool), upload the **contents of `dist/`**
   with whatever method was used before — just replace the old files, keeping
   the same folder structure.

> Rebuilding later: the frontend `.env` intentionally points at
> `http://localhost:5001/api` for local development. A **production** build must
> override it so the live API URL is baked in:
>
> ```bash
> VITE_API_URL=https://api.physiocare-letsplayzone.com/api npm run build
> ```

---

## 9. Step 7 — Verify the live site

From your own machine:

```bash
# The About content for the Physio Care site (expect a JSON object with heroTitle, aboutTitle, ...)
curl -s https://api.physiocare-letsplayzone.com/api/about

# Play Zone about
curl -s https://api.physiocare-letsplayzone.com/api/playzone/about

# A real uploaded image (expect HTTP 200)
curl -sI https://api.physiocare-letsplayzone.com/uploads/image-1777010288930.webp | head -1

# Health check
curl -s https://api.physiocare-letsplayzone.com/        # "API is running..."
```

Then open in a browser (hard-refresh with Ctrl+F5 to drop the old bundle):

- `https://physiocare-letsplayzone.com/doctor` — hero, services, gallery, videos load
- `https://physiocare-letsplayzone.com/play-zone` — activities, services load
- `https://physiocare-letsplayzone.com/admin` — admin login

If you need to (re)set the admin credentials:

```bash
cd /opt/twoinone-backend && node updateAdmin.js
# resets to admin@twoinone.com / newpassword123 — change the password after
# first login via the admin panel
```

---

## 10. Troubleshooting

| Symptom | Cause → Fix |
|---|---|
| `net::ERR_NAME_NOT_RESOLVED` on the site | DNS record not added/propagated → Step 1 |
| `502 Bad Gateway` from `api....` | nginx can't reach Node → `pm2 status`, is `twoinone-api` online? Backend on port `5001`? |
| `503 Service Unavailable` | Node crashed/exited → `pm2 logs twoinone-api` |
| Backend exits with `Error: ... mongoose.connect` | `.env` missing/`MONGO_URI` wrong, or VPS IP not in Atlas allow-list → Steps 2 + 5.3 |
| API responds but site shows no data | CORS → confirm `.env` has `CLIENT_URL=https://physiocare-letsplayzone.com`, then `pm2 restart twoinone-api` |
| Admin login rejected | `JWT_SECRET` changed → copy the original value from the repo `.env` |
| Images 404 | `public/uploads/` not uploaded or not proxied → re-upload folder; nginx proxies `/uploads/` to the backend |
| Site looks old / video section missing | Old bundle still cached or old `index-CoTw7gos.js` not replaced → Step 6, hard-refresh |
| Browser console: "Mixed content" / blocked `http://localhost` | Old bundle → Step 6 (fixed build no longer calls localhost) |

---

## 11. Optional — run everything locally (development)

The repo is already configured for local dev (`VITE_API_URL=http://localhost:5001/api`
in the frontend `.env`, `PORT=5001` in the backend `.env`):

```bash
# Terminal 1 — backend
cd twoinone-backend-main && npm run dev

# Terminal 2 — frontend
npm install && npm run dev
# open http://localhost:5173
```

---

## 12. Security notes

- `.env` files are gitignored — never commit `MONGO_URI` / `JWT_SECRET`.
- Keep `NODE_ENV=production` on the server (Express error handler then hides
  stack traces).
- After login, change the admin password from the `newpassword123` default.
