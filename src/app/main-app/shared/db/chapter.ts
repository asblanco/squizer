import { Question } from './question';

export class Chapter {
  id: number;
  course: number;
  title: string;
  questions: Question[];
}
