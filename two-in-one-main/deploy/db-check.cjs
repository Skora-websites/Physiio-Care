/**
 * Read-only database check for the two-in-one project.
 *
 * Connects to the MongoDB URI found in twoinone-backend-main/.env and prints a
 * document count per collection. It NEVER modifies or prints data, and it
 * never prints credentials.
 *
 * Usage (from the project root):
 *   node deploy/db-check.cjs
 */
const { createRequire } = require('module');
const path = require('path');
const dns = require('dns');

// Some local networks/ISPs have flaky DNS for MongoDB SRV records.
// Prefer a reliable public resolver when available.
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // System resolver in use; fall back to it.
}

const backendDir = path.join(__dirname, '..', 'twoinone-backend-main');
const requireFromBackend = createRequire(path.join(backendDir, 'noop.cjs'));
const dotenv = requireFromBackend('dotenv');
const mongoose = requireFromBackend('mongoose');

dotenv.config({ path: path.join(backendDir, '.env') });

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not found in twoinone-backend-main/.env');
  process.exit(1);
}

const redact = (u) => {
  try {
    const parsed = new URL(u.replace(/^mongodb\+srv/i, 'https:').replace(/^mongodb/i, 'http:'));
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return '(could not parse URI)';
  }
};

async function main() {
  console.log(`Connecting to ${redact(uri)} ...`);
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  } catch (err) {
    console.error('CONNECTION FAILED:', err.message);
    console.error('=> The Atlas credentials may have been revoked, the cluster may be');
    console.error('   paused/deleted, or this machine may not be allow-listed in Atlas.');
    console.error("   (Network Access -> IP Access List -> add this machine's public IP");
    console.error('   or 0.0.0.0/0 to test, then re-run.)');
    process.exit(1);
  }

  const db = mongoose.connection.db;
  console.log(`Connected. Host: ${mongoose.connection.host} | DB: ${db.databaseName}\n`);

  const cols = await db.listCollections().toArray();
  const names = cols.map((c) => c.name).sort();

  if (names.length === 0) {
    console.log('No collections found — database is empty.');
    await mongoose.disconnect();
    process.exit(1);
  }

  const expected = [
    'abouts', 'services', 'galleries', 'leads', 'admins',
    'pzabouts', 'pzactivities', 'pzservices', 'pzgalleries',
    'videos', 'videoshowcases'
  ];

  const rows = [];
  for (const name of names) {
    const count = await db.collection(name).countDocuments();
    rows.push({ name, count });
  }
  rows.sort((a, b) => a.name.localeCompare(b.name));

  const pad = Math.max(...rows.map((r) => r.name.length));
  console.log('COLLECTION'.padEnd(pad + 4) + 'DOCS');
  console.log('-'.repeat(pad + 4 + 4));
  for (const { name, count } of rows) {
    console.log(name.padEnd(pad + 4) + count);
  }

  const missing = expected.filter((e) => !names.includes(e));
  console.log('\nExpected collections missing entirely:', missing.length ? missing.join(', ') : '(none)');
  console.log('Unexpected collections present:', rows.filter((r) => !expected.includes(r.name)).map((r) => r.name).join(', ') || '(none)');

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
