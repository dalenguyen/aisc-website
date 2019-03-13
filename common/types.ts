export interface PublicEvent {
  date: number;
  subjects: string[],
  title: string;
  lead: string;
  facilitators: string[];
  type: EventType;
  video?: string;
  why?: string;
  paper?: string;
  slides?: string;
  reddit?: string;
  code_official?: string;
  code_unofficial?: string;
  dataset1?: string;
  dataset2?: string;
  acronym?: string;
}

export type MemberEvent = PublicEvent & {
  venue: string;
}

export type EventId = string;

export type EventType = 'Main Stream' | 'Foundational' | 'Trending Paper' | 'Author Speaking' | 'Code Review';

export interface AllEvents {
  subjects: string[],
  streams: string[],
  pastEvents: MemberEvent[],
  futureEvents: PublicEvent[]
}