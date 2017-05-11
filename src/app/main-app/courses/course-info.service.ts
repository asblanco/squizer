import { Injectable } from '@angular/core';

import { Answer } from '../db/answer';
import { Chapter } from '../db/chapter';
import { Course } from '../db/course';
import { CourseService } from '../db/course.service';
import { Question } from '../db/question';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class CourseInfoService {
  course: Course;
  // Observable string sources
  // private deleteCourse = new Subject<Course>();
  private editCourse = new Subject<Course>();
  // Observable string streams
  // courseDeleted$ = this.deleteCourse.asObservable();
  courseEdited$ = this.editCourse.asObservable();

  constructor(private courseService: CourseService) { }

  // Service message commands
  // announceDeleteCourse(course: Course) {
  //   this.deleteCourse.next(course);
  // }
  announceEditCourse(course: Course) {
    this.editCourse.next(course);
  }

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
    const chapterIndex = this.indexOfId(this.course.chapters, chapterId);
    const questionIndex = this.indexOfId(this.course.chapters[chapterIndex].questions, question.id);

    this.course.chapters[chapterIndex].questions.splice(questionIndex, 1);
  }

  updateQuestion(chapterId: number, question: Question): void {
    const chapterIndex = this.indexOfId(this.course.chapters, chapterId);
    const questionIndex = this.indexOfId(this.course.chapters[chapterIndex].questions, question.id);

    this.course.chapters[chapterIndex].questions.splice(questionIndex, 1, question);
  }

  private indexOfId(array, id: number) {
      for (let i = 0; i < array.length; i++) {
          if (array[i].id === id) {
            return i;
          }
      }
      return -1;
  }

}
