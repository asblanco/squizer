import { SchoolYear } from './../../db/school-year';
import { Course } from './../../db/course';
import { Answer } from './../../db/answer';

export class ViewTest {
  id: number;
  title: string;
  creation_date: Date;
  course: Course;
  call: {
    id: number;
    school_year: SchoolYear;
    title: string;
    start_date: Date;
    end_date: Date;
  }
  questions: {
    id: number;
    chapter: number;
    title: string;
    last_modified: Date;
  }[]
  answers: Answer[];
}
