// =============================================================================
// pm2 process config for the two-in-one backend
//
// Usage on the production VPS:
//   npm install -g pm2            (once)
//   scp ecosystem.config.cjs root@<vps>:/opt/twoinone-backend/   (copy it next to the backend)
//   cd /opt/twoinone-backend && pm2 start ecosystem.config.cjs
//   pm2 save                      (freeze the process list)
//   pm2 startup                   (auto-restart after reboot; run the printed command)
//
// The backend reads its .env from its own directory (dotenv loads
// <cwd>/.env), so place a production .env next to src/server.js at
// twoinone-backend-main/.env  (see backend.env.production.example).
// =============================================================================

const path = require('path');
const fs = require('fs');

// Works in two layouts:
//   1. Inside the repo  (deploy/ecosystem.config.cjs)        -> ../twoinone-backend-main
//   2. Copied into the backend folder itself (/opt/twoinone-backend)
const repoLayout = path.join(__dirname, '..', 'twoinone-backend-main');
const BACKEND_DIR = fs.existsSync(repoLayout) ? repoLayout : __dirname;

module.exports = {
  apps: [
    {
      name: 'twoinone-api',
      cwd: BACKEND_DIR,
      script: 'src/server.js',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      env: {
        NODE_ENV: 'production',
      },
      // Logs go to pm2's default location: ~/.pm2/logs/twoinone-api-*.log
      // (view live with: pm2 logs twoinone-api)
    },
  ],
};
