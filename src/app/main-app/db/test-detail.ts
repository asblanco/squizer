import { SchoolYear } from './schoolyear';
import { Course } from './course';
import { Answer } from './answer';

export class TestDetail {
  id: number;
  title: string;
  creation_date: Date;
  course: Course;
  term: {
    id: number;
    schoolyear: SchoolYear;
    title: string;
    start_date: Date;
    end_date: Date;
  };
  questions: {
    id: number;
    chapter: number;
    title: string;
    last_modified: Date;
  }[];
  answers: Answer[];
}
