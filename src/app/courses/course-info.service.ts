import { Injectable } from '@angular/core';
import { Course }     from '../shared/db/course';
import { Chapter }    from '../shared/db/chapter';
import { Question }   from '../shared/db/question';
import { Answer }     from '../shared/db/answer';
import { CourseService }  from '../shared/db/course.service';


@Injectable()
export class CourseInfoService {
  course: Course;

  constructor(private courseService: CourseService) { }

  addChapter(chapter: Chapter) {
    this.course.chapters.push(chapter);
  }

  deleteChapter(chapter: Chapter): void {
    this.course.chapters.splice(this.course.chapters.indexOf(chapter), 1);
  }

  addQuestion(chapterId: number, question: Question): void {
    this.course.chapters[this.indexOfId(this.course.chapters, chapterId)].questions.push(question);
  }

  deleteQuestion(chapterId: number, question: Question): void {
    let chapterIndex = this.indexOfId(this.course.chapters, chapterId);
    let questionIndex = this.indexOfId(this.course.chapters[chapterIndex].questions, question.id);

    this.course.chapters[chapterIndex].questions.splice(questionIndex, 1);
  }

  updateQuestion(chapterId: number, question: Question): void {
    let chapterIndex = this.indexOfId(this.course.chapters, chapterId);
    let questionIndex = this.indexOfId(this.course.chapters[chapterIndex].questions, question.id);

    this.course.chapters[chapterIndex].questions.splice(questionIndex, 1, question);
  }

  addAnswer(chapterId: number, question: Question, answer: Answer): Question {
    let chapterIndex = this.indexOfId(this.course.chapters, chapterId);
    let questionIndex = this.course.chapters[chapterIndex].questions.indexOf(question);
    this.course.chapters[chapterIndex].questions[questionIndex].answers.push(answer);
    return this.course.chapters[chapterIndex].questions[questionIndex];
  }

  private indexOfId(array, id: number) {
      for (var i = 0; i < array.length; i++) {
          if (array[i].id === id) return i;
      }
      return -1;
  }

}
