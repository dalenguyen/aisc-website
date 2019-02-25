export interface PublicEvent {
  date: number;
  subjects: string[],
  title: string;
  lead: string;
  facilitators: string[];
  type: string;
  video?: string;
  why?: string;
  paper?: string;
  slides?: string;
  reddit?: string;
  code_official?: string;
  code_unofficial?: string;
  dataset1?: string;
  dataset2?: string;
}

export type MemberEvent = PublicEvent & {
  venue: string;
}