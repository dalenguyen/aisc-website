const fs = require('fs');
const path = require('path');
const { createClient } = require('contentful');
require('dotenv').config();


const config = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CDA_TOKEN: process.env.CTF_CDA_TOKEN,
  CTF_CPA_TOKEN: process.env.CTF_CPA_TOKEN
};

const types = [
  'venue'
];

fetchAndSaveContent();

async function fetchAndSaveContent() {
  const client = createClient({
    host: 'preview.contentful.com',
    space: config.CTF_SPACE_ID,
    accessToken: config.CTF_CPA_TOKEN
  });

  await Promise.all(types.map(t => fetchAndSaveType(client, t)));
}

async function fetchAndSaveType(client, type) {
  const { items } = await client.getEntries({
    content_type: 'venue'
  });

  const entries = items.map(({ fields }) => fields);

  fs.writeFileSync(
    path.join(__dirname, '..', 'tdls', 'data', `${type}.json`),
    JSON.stringify(entries, null, 2)
  );

  console.log(`Fetched and saved type "${type}".`);
}

function fromEntries(iterable) {
  return [...iterable]
    .reduce((obj, { 0: key, 1: val }) => Object.assign(obj, { [key]: val }), {})
}

