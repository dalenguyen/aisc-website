import { MemberEvent } from '../../common/types';

export interface KeyDate {
  date: Date;
  what: string;
}

export function extrapolateEventDates(ev: MemberEvent): KeyDate[] {
  return [
    {
      date: new Date(ev.date),
      what: "The event"
    }
  ];
}