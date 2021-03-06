function getEventId(ev) {
    // TODO: this event hashing unique by date, but if we have two events
    // on the same date in the future we are screwed 
    return "" + toShortDateString(new Date(ev.date));
}
function isImminent(e) {
    var status = eventStatus(e);
    return status === 'countdown' || status === 'live';
}
function eventStatus(ev) {
    if (!ev) {
        throw new Error("Event is undefined.");
    }
    var now = new Date().getTime();
    var duration = 1.2 * 60 * 60 * 1000;
    var countdownPeriod = 24 * 60 * 60 * 1000;
    var evStartTime = ev.date;
    if (now > evStartTime + duration) {
        return 'expired';
    }
    else if (now > evStartTime) {
        return 'live';
    }
    else if (now > evStartTime - countdownPeriod) {
        return 'countdown';
    }
    else {
        return 'too_early';
    }
}
function SEOTitle(ev) {
    return "" + (ev.acronym && "[" + ev.acronym + "] ") + ev.title;
}
function pad(num) {
    // pad single digit number with zero
    return num < 10 ? '0' + num : '' + num;
}
function toShortDateString(d) {
    // returns YYYY-MM-DD
    return d.getYear() + 1900 + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}
function isTentative(ev) {
    // broadly speaking, a question mark indicates uncertainty
    return ev.title.indexOf('?') >= 0 ||
        ev.lead.indexOf('?') >= 0;
}
module.exports = {
    eventStatus: eventStatus, pad: pad,
    toShortDateString: toShortDateString, isTentative: isTentative,
    getEventId: getEventId, SEOTitle: SEOTitle, isImminent: isImminent
};
