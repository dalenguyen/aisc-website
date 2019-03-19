"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var moment = require("moment-timezone");
var fetch = require('isomorphic-unfetch');
var event_1 = require("../common/event");
function getRawEventData(googleKey) {
    return __awaiter(this, void 0, void 0, function () {
        var SHEET_ID, SHEET_VALUE_URL, resp, raw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    SHEET_ID = '1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE';
                    SHEET_VALUE_URL = "https://sheets.googleapis.com/v4/spreadsheets/" + SHEET_ID + "/values/Schedule?key=" + googleKey;
                    return [4 /*yield*/, fetch(SHEET_VALUE_URL, {
                            method: 'GET',
                            cache: 'default'
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    raw = _a.sent();
                    return [2 /*return*/, raw];
            }
        });
    });
}
function splitEvents(events) {
    // split into the past and future
    var past = [];
    var future = [];
    events.forEach(function (e) {
        if (!eventExpired(e)) {
            future.push(e);
        }
        else {
            past.push(e);
        }
    });
    past = past.sort(function (e1, e2) { return e2.date - e1.date; });
    future = future.sort(function (e1, e2) { return e1.date - e2.date; });
    return [past, future];
}
function hideVenue(_a) {
    var venue = _a.venue, publicEv = __rest(_a, ["venue"]);
    // hide venue
    return publicEv;
}
function eventExpired(ev) {
    var status = event_1.eventStatus(ev);
    return status === 'expired';
}
function fetchEventsAndGroupings(googleKey, hideFutureVenue) {
    if (hideFutureVenue === void 0) { hideFutureVenue = true; }
    return __awaiter(this, void 0, void 0, function () {
        var data, _a, rawHeader, rawRows, events, _b, pastEvents, futureEventsWithVenue, futureEvents, subjects, streams;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!googleKey) {
                        throw new Error('Google key is required.');
                    }
                    return [4 /*yield*/, getRawEventData(googleKey)];
                case 1:
                    data = _c.sent();
                    _a = data.values, rawHeader = _a[0], rawRows = _a.slice(1);
                    events = rawRows.map(function (rawR) { return rawRowToRow(rawHeader, rawR); }).filter(
                    //only care about rows that have both title and lead
                    function (e) { return e.title && e.lead; });
                    _b = splitEvents(events), pastEvents = _b[0], futureEventsWithVenue = _b[1];
                    if (hideFutureVenue) {
                        futureEvents = futureEventsWithVenue.map(hideVenue);
                    }
                    else {
                        futureEvents = futureEventsWithVenue;
                    }
                    subjects = pastEvents.reduce(function (subjects, ev) {
                        var newSubjects = [];
                        for (var _i = 0, _a = ev.subjects; _i < _a.length; _i++) {
                            var sub = _a[_i];
                            if (subjects.indexOf(sub) < 0) {
                                newSubjects.push(sub);
                            }
                        }
                        return subjects.concat(newSubjects);
                    }, []);
                    streams = pastEvents.reduce(function (streams, ev) {
                        var newStreams = [];
                        if (streams.indexOf(ev.type) < 0) {
                            newStreams.push(ev.type);
                        }
                        return streams.concat(newStreams);
                    }, []);
                    return [2 /*return*/, { pastEvents: pastEvents, futureEvents: futureEvents, subjects: subjects, streams: streams }];
            }
        });
    });
}
exports.fetchEventsAndGroupings = fetchEventsAndGroupings;
function fetchLinkedInProfiles(googleKey) {
    return __awaiter(this, void 0, void 0, function () {
        var data, linkedInProfileByName, _a, rawHeader, rawRows;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getRawLinkedInData(googleKey)];
                case 1:
                    data = _b.sent();
                    linkedInProfileByName = {};
                    _a = data.values, rawHeader = _a[0], rawRows = _a.slice(1);
                    rawRows.forEach(function (r) {
                        var name = r[rawHeader.indexOf('Name')];
                        var link = r[rawHeader.indexOf('LinkedIn')];
                        if (link) {
                            linkedInProfileByName[name.trim()] = link.trim();
                        }
                    });
                    return [2 /*return*/, linkedInProfileByName];
            }
        });
    });
}
exports.fetchLinkedInProfiles = fetchLinkedInProfiles;
;
function getRawLinkedInData(googleKey) {
    return __awaiter(this, void 0, void 0, function () {
        var SHEET_ID, SHEET_VALUE_URL, resp, raw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    SHEET_ID = '1WghUEANwzE1f8fD_sdTvM9BEmr1C9bZjPlFSIJX9iLE';
                    SHEET_VALUE_URL = "https://sheets.googleapis.com/v4/spreadsheets/" + SHEET_ID + "/values/Profiles?key=" + googleKey;
                    return [4 /*yield*/, fetch(SHEET_VALUE_URL, {
                            method: 'GET',
                            cache: 'default'
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    raw = _a.sent();
                    return [2 /*return*/, raw];
            }
        });
    });
}
function rawRowToRow(rawHeader, rawRow) {
    var title = rawRow[rawHeader.indexOf('Title')];
    var acronym = rawRow[rawHeader.indexOf('Memorable Acronym')];
    var why = rawRow[rawHeader.indexOf('Why')];
    var venue = rawRow[rawHeader.indexOf('Venue')];
    var lead = rawRow[rawHeader.indexOf('Lead')];
    var video = rawRow[rawHeader.indexOf('Youtube Link')];
    var paper = rawRow[rawHeader.indexOf('Paper Reference')];
    var slides = rawRow[rawHeader.indexOf('Slides Link')];
    var facilitators = [];
    var fac1 = rawRow[rawHeader.indexOf('Facilitator 1')];
    var fac2 = rawRow[rawHeader.indexOf('Facilitator 2')];
    // broadly speaking, a question mark indicates uncertainty
    if (fac1 && fac1.indexOf('?') < 0) {
        facilitators.push(fac1);
    }
    if (fac2 && fac2.indexOf('?') < 0) {
        facilitators.push(fac2);
    }
    var dataset1 = rawRow[rawHeader.indexOf('Dataset Link 1')];
    var dataset2 = rawRow[rawHeader.indexOf('Dataset Link 2')];
    var code_official = rawRow[rawHeader.indexOf('Official Github Link')];
    var code_unofficial = rawRow[rawHeader.indexOf('Unofficial Github Link')];
    var reddit = rawRow[rawHeader.indexOf('Reddit Link')];
    var type = rawRow[rawHeader.indexOf('Stream')];
    var subjects = (rawRow[rawHeader.indexOf('Subject Matter Area')] || '').split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s; });
    var dashedDateStr = (rawRow[rawHeader.indexOf('Date')] || '').replace(/\./g, '').replace(/\-/g, ' ');
    var dateAtMidnight = moment.tz(dashedDateStr, "UTC").toDate();
    var dateAtSixThirty = new Date(dateAtMidnight.getTime() + ((5 + 18) * 60 + 30) * 60 * 1000);
    return {
        title: title,
        why: why,
        date: dateAtSixThirty.getTime(),
        lead: lead,
        venue: venue,
        facilitators: facilitators,
        video: video,
        type: type,
        paper: paper,
        slides: slides,
        subjects: subjects,
        dataset1: dataset1,
        dataset2: dataset2,
        code_unofficial: code_unofficial,
        code_official: code_official,
        reddit: reddit,
        acronym: acronym
    };
}
