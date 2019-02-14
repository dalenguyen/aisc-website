#! /usr/bin/env node
// I am ./bin/buildSitemap.js

const path = require('path')
const glob = require('glob')
const fs = require('fs')
const assert = require('assert');

const [n, _, siteName] = process.argv;

assert(siteName, 'site name argument is required.');

const SITE_ROOT = process.env.SITE_ROOT || 'https://tdls.a-i.science'
const SOURCE = process.env.SOURCE || path.join(__dirname, '..', siteName, 'pages', '/**/*.js')
const DESTINATION = process.env.DESTINATION || path.join(__dirname, '..', siteName, 'root-static', 'sitemap.xml')

let diskPages = glob.sync(SOURCE)

const { exportPathMap } = require(path.join(__dirname, '..', siteName, 'next.config'));
let extraPaths;
if (exportPathMap) {
  extraPaths = Object.keys(exportPathMap({}));
} else {
  extraPaths = [];
}

const pagePaths = diskPages.map((page) => {
  let stats = fs.statSync(page)
  let modDate = new Date(stats.mtime)
  let lastMod = `${modDate.getFullYear()}-${('0' + (modDate.getMonth() + 1)).slice(-2)}-${('0' + modDate.getDate()).slice(-2)}`

  page = page.replace(path.join(__dirname, '..', siteName, 'pages'), '')
  page = page.replace(/.js$/, '')
  page = `${SITE_ROOT}${page}`;
  return [page, lastMod];
});


const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ pagePaths.concat(
  extraPaths.map(p => [`${SITE_ROOT}${p}`])
).map(
  ([p, lastMod]) => {
    let xml = '';
    xml += '<url>'
    xml += `<loc>${p}</loc>`
    if (lastMod) {
      xml += `<lastmod>${lastMod}</lastmod>`
    }
    xml += `<changefreq>daily</changefreq>`
    xml += `<priority>0.5</priority>`
    xml += '</url>'
    return xml;
  }).join("\n")}
</urlset>
`

fs.writeFileSync(DESTINATION, xml)

console.log(`Wrote sitemap for ${diskPages.length} pages to ${DESTINATION}`)
