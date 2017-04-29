import { Component, OnInit, OnDestroy, Output, Input, AfterViewInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CoursesSideNavService } from '../courses/courses-side-nav/courses-side-nav.service';
import { CourseService } from '../db/course.service';
import { CourseInfoService } from '../courses/course-info.service';
import { Course } from '../db/course';

import { Call } from '../db/call';
import { TestsSideNavService } from '../tests/tests-side-nav/tests-side-nav.service';
import { SchoolYearService } from '../db/school-year.service';
import { SchoolYear } from '../db/school-year';

import { NotificationsService } from 'angular2-notifications';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  activeTab = 1; // 1=courses, 2=tests
  courses: Course[] = [];
  schoolYears: SchoolYear[] = [];
  selected;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private  coursesSideNavService: CoursesSideNavService,
    private testsSideNavService: TestsSideNavService,
    private courseService: CourseService,
    private schoolYearService: SchoolYearService,
    private courseInfoService: CourseInfoService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
      courseInfoService.courseSelected$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        course => {
          this.selected = course;
      });
      this.testsSideNavService.selectedCall$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        call => {
          this.selected = call;
      });

      router.events
      .filter(event => event instanceof NavigationEnd)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/app/manage-courses') {
          this.getCourses();
          this.activeTab = 1;
        } else if (event.urlAfterRedirects === '/app/manage-tests') {
          this.getSchoolYears();
          this.activeTab = 2;
        }
      });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    (<any>$('.button-collapse')).sideNav();
  }

  openCourseModal() {
    (<any>$('#newCourseModal')).openModal();
  }

  openYearModal() {
    (<any>$('#newYearModal')).openModal();
  }

  getCourses() {
    this.courseService.getCourses()
    .then(courses => { this. coursesSideNavService.announceCoursesList(courses);
                       this.courses = courses; })
    .catch(() => this.notificationsService.error('Error', 'Al descargar la lista de asignaturas.'));

  }

  getSchoolYears() {
    this.schoolYearService.getSchoolYears()
    .then(schoolYears => { this.testsSideNavService.announceSchoolYearList(schoolYears);
                           this.schoolYears = schoolYears; })
    .catch(() => this.notificationsService.error('Error', 'Al descargar la lista de cursos.'));
  }

  selectCourse(course: Course) {
    this.selected = course;
    this.courseInfoService.announceSelectCourse(course);
    (<any>$('.button-collapse')).sideNav('hide');
  }

  select() {
    (<any>$('.button-collapse')).sideNav('hide');
  }

  create(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.courseService.create(name)
      .then(course => {
        this. coursesSideNavService.addCourse(course);
        this.courseInfoService.announceSelectCourse(course);
      })
      .catch(() => this.notificationsService.error('Error', 'Al crear la asignatura: ' + name));

    (<any>$('.button-collapse')).sideNav('hide');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
