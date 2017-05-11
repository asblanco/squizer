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
  // Observable string streams
  getCourses$ = this.coursesList.asObservable();
  addCourse$ = this.newCourse.asObservable();

  constructor(
    private courseService: CourseService,
    private notificationsService: NotificationsService ) {  }

  getCourses() {
    this.courseService.getCourses()
    .then(courses => { this.announceCoursesList(courses); })
    .catch(() => this.notificationsService.error('Error', 'Al descargar la lista de asignaturas.'));
  }

  announceDeleteCourse(course: Course) {
    this.deleteCourse(course);
  }

  announceCoursesList(courses: Course[]) {
    this.courses = courses;
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
