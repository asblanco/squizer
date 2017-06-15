import { Injectable } from '@angular/core';
import { Course } from '../../db/course';
import { CourseService } from '../../db/course.service';
import { I18nService } from '../../../shared/i18n/i18n.service';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class CoursesSideNavService {
  courses: Course[] = [];
  // Observable string sources
  private coursesList = new Subject<Course[]>();
  // Observable string streams
  getCourses$ = this.coursesList.asObservable();

  constructor(
    private courseService: CourseService,
    private i18nService: I18nService
  ) {}

  getCourses() {
    this.courseService.getCourses()
    .then(courses => { this.announceCoursesList(courses); })
    .catch(() => this.i18nService.error(9, ''));
  }

  announceCoursesList(courses: Course[]) {
    this.courses = courses; // Here it gets linked!!! so all changes to this.courses will be propagated
    this.coursesList.next(courses);
  }

  addCourse(course: Course) {
    this.courses.push(course);
  }

  editCourse(course: Course) {
    this.courses.splice(this.indexOf(this.courses, course.id), 1, course);
  }

  deleteCourse(course: Course) {
    this.courses.splice(this.indexOf(this.courses, course.id), 1);
  }

  private indexOf(array, itemId) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === itemId) { return i; }
    }
    return -1;
  }
}
