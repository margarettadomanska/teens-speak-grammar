const fs = require("fs");
const path = require("path");

const SITE = "https://teenspeakgrammar.com";

const grammar = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "data", "grammar", "index.json"),
    "utf8"
  )
);

const functional = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "data", "functional", "index.json"),
    "utf8"
  )
);

const urls = [];

// Homepage
urls.push(`${SITE}/`);

// Grammar pages
grammar.forEach(topic => {
  urls.push(
    `${SITE}/grammar/${topic.filename.replace(".json", "")}`
  );
});

// Functional pages
functional.forEach(topic => {
  urls.push(
    `${SITE}/functional/${topic.filename.replace(".json", "")}`
  );
});

const today = new Date().toISOString().split("T")[0];

const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url === `${SITE}/` ? "1.0" : "0.8"}</priority>
  </url>`).join("")}

</urlset>`;

fs.writeFileSync(
  path.join(__dirname, "..", "sitemap.xml"),
  xml
);

console.log(`✅ Sitemap generated with ${urls.length} URLs.`);
