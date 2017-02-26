import { Question } from './question';

export class Chapter {
  id: number;
  courseId: number;
  title: string;
  questions: Question[];
}
