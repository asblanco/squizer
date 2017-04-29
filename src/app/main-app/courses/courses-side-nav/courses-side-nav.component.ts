import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CourseInfoService } from '../../courses/course-info.service';
import { Course } from '../../db/course';
import { CourseService } from '../../db/course.service';
import { CoursesSideNavService } from './courses-side-nav.service';
import { NotificationsService } from 'angular2-notifications';

import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  moduleId: module.id,
  selector: 'app-courses-side-nav',
  templateUrl: './courses-side-nav.component.html',
  styleUrls: ['./courses-side-nav.component.css']
})
export class CoursesSideNavComponent implements OnInit, OnDestroy {
  selectedCourse: Course = null;
  courses: Course[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private courseInfoService: CourseInfoService,
    private coursesSideNavService: CoursesSideNavService,
    private notificationsService: NotificationsService
  ) {

    this. coursesSideNavService.getCourses$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      courses => {
        this.courses = courses;
    });
    courseInfoService.courseSelected$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      course => {
        this.selectedCourse = course;
    });
    courseInfoService.courseDeleted$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      course => {
        this.selectedCourse = null;
    });
  }

  ngOnInit() {}

  openCourseModal() {
    (<any>$('#newCourseModal')).openModal();
  }

  select(course) {
    this.selectedCourse = course;
    this.courseInfoService.announceSelectCourse(course);
    (<any>$('.button-collapse')).sideNav('hide');
  }

  create(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.courseService.create(name)
      .then(course => {
        this.coursesSideNavService.addCourse(course);
        this.courseInfoService.announceSelectCourse(course);
      })
      .catch(() => this.notificationsService.error('Error', 'Al crear la asignatura: ' + name));
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private indexOf(array, itemId) {
      for (let i = 0; i < array.length; i++) {
          if (array[i].id === itemId) { return i; }
      }
      return -1;
  }
}
