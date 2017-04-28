import { Call } from './call';

export class SchoolYear {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  calls: Call[];
}
