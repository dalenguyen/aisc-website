const fs = require('fs');
const path = require('path');
const contentful = require('contentful');

import createClient from 'contentful';

const { SPACE: CONTENTFUL_SPACE, TOKEN: CONTENTFUL_TOKEN } = process.env;


const defaultConfig = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CDA_TOKEN: process.env.CTF_CDA_TOKEN,
  CTF_CPA_TOKEN: process.env.CTF_CPA_TOKEN
};


const types = [
  'venue'
];

async function fetchAndSaveContent() {

}