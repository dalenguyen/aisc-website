
import {
  fetchEvents as _fetchEvents,
  fetchSingleEvent as _fetchSingleEvent
} from './events';
import {
  createLiveStreamEvent as _createLiveStreamEvent
} from './youtube';

import * as functions from 'firebase-functions';

export const fetchEvents = functions.https.onCall(_fetchEvents);
export const fetchSingleEvent = functions.https.onCall(_fetchSingleEvent);
export const createLiveStreamEvent = functions.https.onCall(_createLiveStreamEvent);