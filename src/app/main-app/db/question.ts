import { Answer } from './answer';

export class Question {
  id: number;
  chapter: number;
  title: string;
  last_modified: Date;
  answers: Answer[];
}
