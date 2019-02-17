const fs = require('fs');
const path = require('path');
const { createClient } = require('contentful');
require('dotenv').config();


const config = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CDA_TOKEN: process.env.CTF_CDA_TOKEN,
  CTF_CPA_TOKEN: process.env.CTF_CPA_TOKEN
};

const client = createClient({
  host: 'preview.contentful.com',
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CPA_TOKEN
});

const types = [
  'venue',
];

fetchAndSaveWriteups();
fetchAndSaveContent();

async function fetchAndSaveWriteups() {
  const type = 'writeup';
  const { items } = await client.getEntries({
    content_type: type
  });

  const entries = items.map(({ fields }) => fields);
  const dir = path.join(__dirname, '..', 'tdls', 'data', type);

  ensureDir(dir);
  entries.forEach(e => {
    console.log(e.content)

    fs.writeFileSync(
      path.join(dir, `${e.id}.md`),
      e.content
    )
  });

  console.log(`Fetched and saved content for "${type}".`);

}



function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}


async function fetchAndSaveContent() {
  await Promise.all(types.map(t => fetchAndSaveType(client, t)));
}

async function fetchAndSaveType(client, type) {
  const { items } = await client.getEntries({
    content_type: type
  });

  const entries = items.map(({ fields }) => fields);

  fs.writeFileSync(
    path.join(__dirname, '..', 'tdls', 'data', `${type}.json`),
    JSON.stringify(entries, null, 2)
  );

  console.log(`Fetched and saved type "${type}".`);
}
