import { Component, OnInit, OnDestroy, Output, Input, AfterViewInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SideNavService }       from '../shared/side-nav/side-nav.service';
import { CourseService }        from '../shared/db/course.service';
import { CourseInfoService }    from '../courses/course-info.service';
import { NotificationsService } from 'angular2-notifications';
import { Course } from '../shared/db/course';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  activeTab: number = 1; //1=courses, 2=tests
  courses: Course[] = [];
  selected;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private sideNavService: SideNavService,
    private courseService: CourseService,
    private courseInfoService: CourseInfoService,
    private notificationsService: NotificationsService,
    private router: Router )
    {
      courseInfoService.courseSelected$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        course => {
          this.selected = course;
      });

      router.events
      .filter(event => event instanceof NavigationEnd)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: NavigationEnd) => {
        if(event.urlAfterRedirects == "/app/manage-courses"){
          this.getCourses();
          this.activeTab = 1;
        }
        else if(event.urlAfterRedirects == "/app/manage-tests"){
          this.getTests();
          this.activeTab = 2;
        }
      });
    }

  ngOnInit() {}

  ngAfterViewInit() {
    (<any>$(".button-collapse")).sideNav();
  }

  openCourseModal() {
    (<any>$('#newCourseModal')).openModal();
  }

  openYearModal() {
    (<any>$('#newYearModal')).openModal();
  }

  getCourses(){
    this.courseService.getCourses()
    .then(courses => {this.sideNavService.announceCoursesList(courses),
                     this.courses = courses})
    .catch(() => this.notificationsService.error("Error", "Al descargar la lista de cursos."));

  }

  getTests(){}

  selectCourse(course: Course) {
    this.selected = course;
    this.courseInfoService.announceSelectCourse(course);
    (<any>$(".button-collapse")).sideNav('hide');
  }

  create(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.courseService.create(name)
      .then(course => {
        this.sideNavService.addCourse(course);
        this.courseInfoService.announceSelectCourse(course);
      })
      .catch(() => this.notificationsService.error("Error", "Al crear la asignatura: " + name));

    (<any>$(".button-collapse")).sideNav('hide');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
