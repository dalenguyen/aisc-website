const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass')


module.exports = withTypescript(withSass({
  exportPathMap(defaultPathMap) {

    const { pastEvents, futureEvents } = require('./static/data/events.json');
    const events = pastEvents.concat(futureEvents);
    const { getEventId } = require('../common/event');
    const eventPaths = {}
    for (let ev of events) {
      const id = getEventId(ev);
      eventPaths[`/events/${id}`] = {
        page: '/single-event', query: { id }
      }
    }

    return {
      ...defaultPathMap,
      ...eventPaths
    };
  }
}))