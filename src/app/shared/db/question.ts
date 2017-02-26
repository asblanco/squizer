import { Answer } from './answer';

export class Question {
  id: number;
  courseId: number;
  chapterId: number;
  title: string;
  answers: Answer[];
}
