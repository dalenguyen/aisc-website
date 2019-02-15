
const READABLE_EVENT_TYPE = {
  'classics': 'Classics',
  'fasttrack': 'Trending Papers',
  'main': 'Main Stream',
  'authors': 'Authors Speaking',
  'codereview': 'Code Review'
}

function getEventId(ev) {
  // TODO: this event hashing unique by date, but if we have two events
  // on the same date in the future we are screwed 
  return "" + toShortDateString(new Date(ev.date));
}


function eventStatus(ev) {
  if (!ev) {
    return null;
  }
  const now = new Date().getTime();
  const duration = 2.5 * 60 * 60 * 1000;
  const countdownPeriod = 40 * 60 * 60 * 1000;

  const evStartTime = ev.date;

  if (now > evStartTime + duration) {
    return 'expired';
  } else if (now > evStartTime) {
    return 'live';
  } else if (now > evStartTime - countdownPeriod) {
    return 'countdown';
  } else {
    return 'too_early';
  }
}

function pad(num) {
  // pad single digit number with zero
  return num < 10 ? '0' + num : num;
}

function toShortDateString(d) {
  // returns YYYY-MM-DD
  return `${d.getYear() + 1900}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function isTentative(ev) {
  // broadly speaking, a question mark indicates uncertainty
  return ev.title.indexOf('?') >= 0 ||
    ev.lead.indexOf('?') >= 0;
}

module.exports = {
  READABLE_EVENT_TYPE, eventStatus, pad,
  toShortDateString, isTentative,
  getEventId
};