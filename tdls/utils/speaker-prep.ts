import { Event } from '../../common/types';

interface Checkpoint {
  type: 'checkpoint';
  value: string;
  label: string;
  due: number;
  dependencies: Dependency[]
}

interface ActionItem {
  type: 'action_item';
  value: string;
  label: string;
}

type DepCode = {
  source: string;
};

type Dependency = Checkpoint | ActionItem | DepCode;

const MILESTONES: Checkpoint[] = [

]

export function deriveCheckpoints(ev: Event) {
  const date = new Date(ev.date);
}
