import { Term } from './term';

export class SchoolYear {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  terms: Term[];
}
