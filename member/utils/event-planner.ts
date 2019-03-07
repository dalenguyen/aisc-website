import { MemberEvent } from '../../common/types';
import * as moment from 'moment';

export interface KeyDate {
  date: Date;
  what: string;
}

export function extrapolateEventDates(ev: MemberEvent): KeyDate[] {
  const dateM = moment(ev.date);
  const twoWeeksM = dateM.subtract(2, "weeks");

  return [
    {
      date: twoWeeksM.toDate(),
      what: "Two weeks"
    },
    {
      date: new Date(ev.date),
      what: "The event"
    }
  ];
}