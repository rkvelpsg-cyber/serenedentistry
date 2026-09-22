import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const sourceRoot = path.join(root, "src");
const siteUrl = "https://serenedentalwhitefield.com";
const routes = [
  "/",
  ...fs
    .readdirSync(path.join(dist, "treatments"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `/treatments/${entry.name}`),
];

const escapeForRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const count = (html, pattern) => [...html.matchAll(pattern)].length;
const getAttribute = (html, pattern) => html.match(pattern)?.[1] ?? "";
const failures = [];

for (const route of routes) {
  const file =
    route === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, route, "index.html");
  if (!fs.existsSync(file)) {
    failures.push(`${route}: missing ${file}`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const expectedCanonical = `${siteUrl}${route}`;
  const title = getAttribute(html, /<title>([^<]+)<\/title>/i);
  const description = getAttribute(
    html,
    /<meta\s+name="description"\s+content="([^"]+)"/i,
  );
  const canonical = getAttribute(
    html,
    /<link\s+rel="canonical"\s+href="([^"]+)"/i,
  );
  const ogUrl = getAttribute(
    html,
    /<meta\s+property="og:url"\s+content="([^"]+)"/i,
  );
  const h1Count = count(html, /<h1\b/gi);
  const hasFaqOrContent =
    /Frequently Asked Questions|What We Provide|Dental Care/i.test(html);
  const breadcrumb = html.match(
    /<script id="breadcrumb-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/i,
  );
  const hasBreadcrumb = route === "/" ? !breadcrumb : Boolean(breadcrumb);
  const metadataCounts = {
    title: count(html, /<title>/gi),
    description: count(html, /<meta\s+name="description"/gi),
    canonical: count(html, /<link\s+rel="canonical"/gi),
    ogTitle: count(html, /property="og:title"/gi),
    ogDescription: count(html, /property="og:description"/gi),
    ogImage: count(html, /property="og:image"/gi),
    ogUrl: count(html, /property="og:url"/gi),
    twitterCard: count(html, /name="twitter:card"/gi),
    twitterTitle: count(html, /name="twitter:title"/gi),
    twitterDescription: count(html, /name="twitter:description"/gi),
    twitterImage: count(html, /name="twitter:image"/gi),
  };

  if (
    !title ||
    !description ||
    canonical !== expectedCanonical ||
    ogUrl !== expectedCanonical
  ) {
    failures.push(`${route}: route metadata mismatch`);
  }
  if (h1Count !== 1)
    failures.push(`${route}: expected one H1, found ${h1Count}`);
  if (!hasFaqOrContent) failures.push(`${route}: no visible content marker`);
  if (!hasBreadcrumb) failures.push(`${route}: breadcrumb mismatch`);
  if (breadcrumb) {
    const breadcrumbData = JSON.parse(breadcrumb[1]);
    const lastItem = breadcrumbData.itemListElement.at(-1)?.item;
    if (lastItem !== expectedCanonical)
      failures.push(`${route}: breadcrumb URL mismatch`);
  }
  if (Object.values(metadataCounts).some((value) => value !== 1)) {
    failures.push(`${route}: duplicate or missing metadata tags`);
  }

  console.log(
    `${route}\n  Title: ${title}\n  Meta description: ${description ? "PASS" : "FAIL"}\n  Canonical: ${canonical === expectedCanonical ? "PASS" : "FAIL"}\n  H1 count: ${h1Count}\n  FAQ/content: ${hasFaqOrContent ? "PASS" : "FAIL"}\n  Breadcrumb JSON-LD: ${hasBreadcrumb ? "PASS" : "FAIL"}`,
  );
}

function findSourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? findSourceFiles(entryPath) : [entryPath];
  });
}

const sourceText = findSourceFiles(sourceRoot)
  .filter((file) => /\.(tsx?|jsx?)$/.test(file))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
if (/href="#"/.test(sourceText))
  failures.push('src: href="#" placeholder remains');
if (/98765|919876543210|9876543210/.test(sourceText)) {
  failures.push("src: placeholder phone number remains");
}

if (failures.length) {
  console.error("Static prerender verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Static prerender verification passed for ${routes.length} routes.`,
);
