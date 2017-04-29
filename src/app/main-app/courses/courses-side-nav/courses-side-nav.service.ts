import { Injectable } from '@angular/core';
import { Course } from '../../db/course';
import { CourseService } from '../../db/course.service';
import { NotificationsService } from 'angular2-notifications';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class CoursesSideNavService {
  courses: Course[] = [];
  // Observable string sources
  private coursesList = new Subject<Course[]>();
  private newCourse = new Subject<Course>();
  private select = new Subject<any>();
  // Observable string streams
  getCourses$ = this.coursesList.asObservable();
  addCourse$ = this.newCourse.asObservable();
  selected$ = this.select.asObservable();

  constructor(
    private courseService: CourseService,
    private notificationsService: NotificationsService ) {  }

  announceCoursesList(courses: Course[]) {
    this.courses = courses;
    this.coursesList.next(courses);
  }

  announceSelected(item) {
    this.select.next(item);
  }

  announceDeleteCourse(course: Course) {
    this.select.next(course);
    this.deleteCourse(course);
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
