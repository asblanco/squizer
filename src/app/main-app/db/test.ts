import { Term } from './term';
import { Course } from './course';
import { Question } from './question';
import { Answer } from './answer';

export class Test {
  id: number;
  title: string;
  creation_date: Date;
  course: number;
  term: number;
  questions: number[];
  answers: number[];
}
