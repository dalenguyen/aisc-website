import fetch from 'isomorphic-unfetch';


async function fetchRaw(url) {
  const resp = await fetch(url, {
    method: 'GET',
    cache: 'default'
  });
  return await resp.json();
}


export const getLinkedInProfiles = runOnlyOnce(async (isServer) => {
  if (isServer) {
    return require('../static/data/profiles.json');
  } else {
    return await fetchRaw('/static/data/profiles.json');
  }
});

export const getEventsAndGroupings = runOnlyOnce(async (isServer) => {
  if (isServer) {
    const objs = require('../static/data/events.json');
    return objs;
  } else {
    const objs = await fetchRaw('/static/data/events.json');
    return objs;
  }
});

// cache-enabled, guarantees only one fetch
function runOnlyOnce(fetcher) {
  let executeStatus = 'unfetched';
  let executeP = null;
  let cachedResult = null;

  return function () {
    const args = arguments;
    if (executeStatus === 'fetching') {
      return executeP;
    } else if (executeStatus === 'unfetched') {
      executeStatus = 'fetching';
      executeP = new Promise(async (resolve) => {
        cachedResult = await fetcher(...args);

        executeStatus = 'fetched';
        executeP = null;

        resolve(cachedResult);

      });
      return executeP;
    } else // fetched
    {
      return new Promise((resolve) => {
        resolve(cachedResult);
      });
    }
  }
}