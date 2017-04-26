import { Answer } from './answer';

export class Question {
  id: number;
  chapter: number;
  title: string;
  answers: Answer[];
}
