import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const serverModule = await import(
  pathToFileURL(path.join(root, ".prerender", "prerender.js")).href
);

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const toAbsoluteUrl = (route) => `${serverModule.SITE_URL}${route}`;

const distAssetManifest = fs.existsSync(path.join(dist, "assets"))
  ? fs
      .readdirSync(path.join(dist, "assets"), { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
  : [];

function getDistAssetUrlForLocalPath(localPath) {
  const fileName = path.basename(localPath);
  const stem = fileName.replace(/\.[^.]+$/, "").toLowerCase();
  const match = distAssetManifest.find((assetName) =>
    assetName.toLowerCase().includes(stem),
  );
  if (!match) return null;
  return `/assets/${match}`;
}

function rewriteLocalAssetUrls(html) {
  // Matches both Windows (file:///C:/...) and POSIX (file:///opt/...) file URLs.
  return html.replace(/file:\/\/\/([A-Za-z]:\/)?[^\s"'<>]+/g, (match) => {
    const decoded = decodeURIComponent(match);
    const localPath = decoded.replace(/^file:\/\//i, "");
    const resolved = getDistAssetUrlForLocalPath(localPath);
    return resolved ?? match;
  });
}

function createStructuredData(route, seo) {
  const dentist = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Serene Dentistry",
    image: `${serverModule.SITE_URL}/og-image.jpg`,
    url: `${serverModule.SITE_URL}/`,
    telephone: "+91 89719 19743",
    email: "serenedentistrywhitefield@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Arka Shine, 1st Floor, #196, 3rd Cross, ECC Road, Prithvi Layout",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560066",
      addressCountry: "IN",
    },
    areaServed: ["Whitefield", "Bengaluru", "Karnataka"],
    medicalSpecialty: [
      "Orthodontics",
      "Cosmetic Dentistry",
      "Oral Surgery",
      "Dental Implants",
    ],
    hasMap: "https://maps.google.com/?q=Serene+Dentistry+Whitefield+Bengaluru",
  };

  const schemas = [dentist];
  if (seo.treatment) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: toAbsoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seo.treatment.title,
          item: toAbsoluteUrl(route),
        },
      ],
    });
  }

  return schemas
    .map((schema) => {
      const id =
        schema["@type"] === "Dentist"
          ? "local-business-schema"
          : "breadcrumb-schema";
      return `<script id="${id}" type="application/ld+json">${JSON.stringify(schema)}</script>`;
    })
    .join("");
}

function clearDefaultSeoTags(html) {
  const patterns = [
    /<meta\s+name="description"[^>]*>\s*/gi,
    /<meta\s+name="keywords"[^>]*>\s*/gi,
    /<meta\s+name="robots"[^>]*>\s*/gi,
    /<meta\s+name="theme-color"[^>]*>\s*/gi,
    /<meta\s+property="og:type"[^>]*>\s*/gi,
    /<meta\s+property="og:site_name"[^>]*>\s*/gi,
    /<meta\s+property="og:title"[^>]*>\s*/gi,
    /<meta\s+property="og:description"[^>]*>\s*/gi,
    /<meta\s+property="og:url"[^>]*>\s*/gi,
    /<meta\s+property="og:image"[^>]*>\s*/gi,
    /<meta\s+property="og:locale"[^>]*>\s*/gi,
    /<meta\s+name="twitter:card"[^>]*>\s*/gi,
    /<meta\s+name="twitter:title"[^>]*>\s*/gi,
    /<meta\s+name="twitter:description"[^>]*>\s*/gi,
    /<meta\s+name="twitter:image"[^>]*>\s*/gi,
    /<link\s+rel="canonical"[^>]*>\s*/gi,
    /<title>.*?<\/title>\s*/is,
  ];

  return patterns.reduce(
    (result, pattern) => result.replace(pattern, ""),
    html,
  );
}

function createDocument(route) {
  const seo = serverModule.getRouteSeo(route);
  const renderedApp = rewriteLocalAssetUrls(serverModule.renderRoute(route));
  const canonical = toAbsoluteUrl(route);
  const keywords = seo.keywords.join(", ");
  const structuredData = createStructuredData(route, seo);
  const injection = `
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Serene Dentistry" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${serverModule.SITE_URL}/og-image.jpg" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${serverModule.SITE_URL}/og-image.jpg" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <title>${escapeHtml(seo.title)}</title>
    ${structuredData}
  `;

  const withoutDefaultSeo = clearDefaultSeoTags(template);

  return withoutDefaultSeo
    .replace(/<\/head>/i, `${injection}\n</head>`)
    .replace(/<div id="root"><\/div>/i, `<div id="root">${renderedApp}</div>`);
}

for (const route of serverModule.getRoutes()) {
  const outputDirectory = route === "/" ? dist : path.join(dist, route);
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(outputDirectory, "index.html"),
    createDocument(route),
  );
}

fs.rmSync(path.join(root, ".prerender"), { recursive: true, force: true });
console.log(`Prerendered ${serverModule.getRoutes().length} routes.`);
