import { Call } from './call';
import { Course } from './course';
import { Question } from './question';
import { Answer } from './answer';

export class Test {
  id: number;
  title: string;
  creation_date: Date;
  course: number;
  call: number;
  questions: Question[];
  answers: Answer[];
}
