import fetch from 'isomorphic-unfetch';

export const READABLE_EVENT_TYPE = {
  'classics': 'Classics',
  'fasttrack': 'Fast Track',
  'main': 'Main Stream',
  'authors': 'Authors Stream',
  'codereview': 'Code Review'
}

async function fetchRaw(url) {
  const resp = await fetch(url, {
    method: 'GET',
    cache: 'default'
  });
  return await resp.json();
}


export const getLinkedInProfiles = runOnlyOnce( async (isServer) => {
  if(isServer) {
    return require('../static/data/profiles.json');
  } else {
    return await fetchRaw('/static/data/profiles.json');
  }
});

export const getEventsAndGroupings = runOnlyOnce(async (isServer) => {
  if(isServer) {
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

export function nameToLink(name, link) {
  if (!link) {
    return name;
  } else {
    return (
      <a key={name} className="person-name" href={link} target="_blank">
        {name}&nbsp;
        <i className="fa fa-linkedin-square"></i>
      </a>
    );
  }
}

export function eventStatus(ev) {
  if(!ev) {
    return null;
  }
  const now = new Date().getTime();
  const duration = 2.5 * 60 * 60 * 1000;
  const countdownPeriod = 40 * 60 * 60 * 1000;

  const evStartTime = ev.date;

  if(now > evStartTime + duration) {
    return 'expired';
  } else if (now > evStartTime) {
    return 'live';
  } else if (now > evStartTime - countdownPeriod) {
    return 'countdown';
  } else {
    return 'too_early';
  }
}

export function pad(num) {
  // pad single digit number with zero
  return num < 10 ? '0' + num : num;
}

export function toShortDateString(d) {
  // returns YYYY-MM-DD
  return `${d.getYear() + 1900}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function getEventId(ev) {
  // TODO: this event hashing unique by date, but if we have two events
  // on the same date in the future we are screwed 
  return "" + toShortDateString(new Date(ev.date));
}

export function isTentative(ev) {
  // broadly speaking, a question mark indicates uncertainty
  return ev.title.indexOf('?') >= 0 ||
    ev.lead.indexOf('?') >= 0;
}

export function sleep(millsecs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millsecs)
  });
}