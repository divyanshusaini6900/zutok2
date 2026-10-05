// Tells IndexNow search engines (Bing, Yandex, Seznam and others) that the site's pages changed.
// Bing's index also feeds ChatGPT search and Copilot.
//
//   npm run indexnow              submits every URL in out/sitemap.xml
//   node scripts/indexnow.mjs --dry-run   prints what would be sent, sends nothing
//
// Run it after `npm run deploy` has finished and the site is live: the engines fetch the key file
// from www.zutok.in to check the request, so it must already be published. Submitting unchanged
// pages over and over doesn't help, so run it once per deploy that changed content.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const HOST = "www.zutok.in";
// The key is public by design: it is also served as public/<key>.txt so the engines can verify ownership.
const KEY = "974d7fc0f4093e3f3e7196913bee410a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const root = process.cwd();
const sitemap = join(root, "out", "sitemap.xml");
const dryRun = process.argv.includes("--dry-run");

if (!existsSync(join(root, "public", `${KEY}.txt`))) {
  console.error(`public/${KEY}.txt is missing. It must contain the key and be deployed with the site.`);
  process.exit(1);
}
if (!existsSync(sitemap)) {
  console.error("No out/sitemap.xml. Run `npm run build` (or `npm run deploy`) first.");
  process.exit(1);
}

const urls = [...readFileSync(sitemap, "utf8").matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
const urlList = [...new Set(urls)].filter((u) => new URL(u).host === HOST);
if (!urlList.length) {
  console.error(`No ${HOST} URLs found in out/sitemap.xml.`);
  process.exit(1);
}

const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

if (dryRun) {
  console.log(`Would POST ${urlList.length} URLs to ${ENDPOINT}:\n`);
  console.log(JSON.stringify(body, null, 2));
  process.exit(0);
}

// The engines reject the batch if they can't read the key file, so check it is live first.
const keyCheck = await fetch(KEY_LOCATION, { redirect: "follow" }).catch((e) => ({ ok: false, status: e.message }));
const liveKey = keyCheck.ok ? (await keyCheck.text()).trim() : null;
if (liveKey !== KEY) {
  console.error(`${KEY_LOCATION} is not serving the key yet (${keyCheck.status}). Deploy the site, wait for Pages, then retry.`);
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const meaning = {
  200: "OK, URLs submitted.",
  202: "Accepted. The key is still being validated; the URLs will be processed.",
  400: "Bad request: the payload is malformed.",
  403: "Forbidden: the key file was not found or does not match.",
  422: "Unprocessable: some URLs don't belong to the host, or the key doesn't match.",
  429: "Too many requests: wait before submitting again.",
};
console.log(`IndexNow responded ${res.status}: ${meaning[res.status] ?? (await res.text())}`);
console.log(`${urlList.length} URLs from out/sitemap.xml.`);
if (!res.ok) process.exit(1);
