import { MemberEvent } from '../../common/types';
import * as moment from 'moment';

export interface KeyDate {
  date: Date;
  what: string;
}

export function extrapolateEventDates(ev: MemberEvent): KeyDate[] {
  const dateM = moment(new Date(ev.date));
  const twoWeeksM = dateM.clone().subtract(2, "weeks");
  const twoDaysM = dateM.clone().subtract(2, "days");

  return [
    {
      date: twoWeeksM.toDate(),
      what: "Two weeks"
    },
    {
      date: twoDaysM.toDate(),
      what: "Slides - final draft ready"
    },
    {
      date: new Date(ev.date),
      what: "Event day"
    }
  ];
}