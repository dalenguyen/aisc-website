export interface PublicEvent {
  date: number;
  subjects: string[],
  title: string;
  lead: string;
  facilitators: string[];
  type: string;
}

export type MemberEvent = PublicEvent & {
  venue: string;
}