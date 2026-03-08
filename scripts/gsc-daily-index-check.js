/**
 * GSC Daily Index Check
 * Fetches sitemap from live URL, inspects indexing status via Google Search Console,
 * and submits unindexed URLs via the Google Indexing API.
 */

const { google } = require('googleapis');

const SITE_URL        = process.env.SITE_URL        || 'https://www.saguarotransport.com/';
const SITEMAP_URL     = process.env.SITEMAP_URL      || 'https://www.saguarotransport.com/sitemap.xml';
const MAX_INSPECT     = parseInt(process.env.MAX_INSPECT     || '100', 10);
const MAX_SUBMIT      = parseInt(process.env.MAX_SUBMIT      || '50',  10);
const INSPECT_DELAY   = parseInt(process.env.INSPECT_DELAY_MS || '300', 10);
const SUBMIT_DELAY    = parseInt(process.env.SUBMIT_DELAY_MS  || '200', 10);

const CREDENTIALS     = JSON.parse(process.env.GSC_CREDENTIALS_JSON);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: CREDENTIALS,
    scopes: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/indexing',
    ],
  });
  return auth.getClient();
}

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map((m) => m[1].trim());
}

async function inspectUrl(authClient, url) {
  const token = await authClient.getAccessToken();
  const res = await fetch(
    'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Inspect failed for ${url}: ${res.status} ${err}`);
  }
  const data = await res.json();
  const verdict = data?.inspectionResult?.indexStatusResult?.verdict;
  return verdict === 'PASS'; // true = indexed
}

async function submitUrl(authClient, url) {
  const token = await authClient.getAccessToken();
  const res = await fetch(
    'https://indexing.googleapis.com/v3/urlNotifications:publish',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Submit failed for ${url}: ${res.status} ${err}`);
  }
}

async function main() {
  console.log(`[GSC Daily Index Check] Fetching sitemap: ${SITEMAP_URL}`);
  const allUrls = await fetchSitemapUrls();
  console.log(`[GSC Daily Index Check] Total URLs in sitemap: ${allUrls.length}`);
  console.log(`[GSC Daily Index Check] Will inspect up to ${MAX_INSPECT} URLs, submit up to ${MAX_SUBMIT} not-indexed.\n`);

  const authClient = await getAuthClient();

  // Shuffle so we don't always inspect the same URLs first
  const shuffled = allUrls.sort(() => Math.random() - 0.5).slice(0, MAX_INSPECT);

  let indexed = 0;
  const notIndexed = [];
  let inspectErrors = 0;

  for (let i = 0; i < shuffled.length; i++) {
    const url = shuffled[i];
    try {
      const isIndexed = await inspectUrl(authClient, url);
      if (isIndexed) {
        indexed++;
      } else {
        notIndexed.push(url);
      }
    } catch (e) {
      console.error(`  [error] ${e.message}`);
      inspectErrors++;
    }

    if ((i + 1) % 50 === 0) {
      console.log(`  Inspected ${i + 1}/${shuffled.length}... (indexed so far: ${indexed})`);
    }

    await sleep(INSPECT_DELAY);
  }

  console.log(`  Inspected ${shuffled.length}/${shuffled.length}... (indexed so far: ${indexed})\n`);
  console.log('--- Summary ---');
  console.log(`Inspected: ${shuffled.length}, Already indexed: ${indexed}, Not indexed: ${notIndexed.length}, Errors: ${inspectErrors}\n`);

  if (notIndexed.length === 0) {
    console.log('All inspected URLs are indexed. Nothing to submit.');
    return;
  }

  const toSubmit = notIndexed.slice(0, MAX_SUBMIT);
  console.log(`--- Submitting ${toSubmit.length} URLs for indexing ---\n`);

  let submitted = 0;
  let submitErrors = 0;

  for (let i = 0; i < toSubmit.length; i++) {
    const url = toSubmit[i];
    try {
      await submitUrl(authClient, url);
      console.log(`  [${i + 1}/${toSubmit.length}] Submitted: ${url}`);
      submitted++;
    } catch (e) {
      console.error(`  [${i + 1}/${toSubmit.length}] Error: ${e.message}`);
      submitErrors++;
    }
    await sleep(SUBMIT_DELAY);
  }

  console.log('\n--- Done ---');
  console.log(`Submitted for indexing: ${submitted}, Submit errors: ${submitErrors}`);
  console.log(`Remaining not-indexed (will be picked up on next run): ${notIndexed.length - toSubmit.length}`);
}

main().catch((e) => {
  console.error('[FATAL]', e.message);
  process.exit(1);
});
