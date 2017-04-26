import { Component, OnInit, EventEmitter, Output, Input }  from '@angular/core';
import { Router, NavigationEnd }  from '@angular/router';
import { CourseService }          from '../../shared/db/course.service';
import { CourseInfoService }      from '../../courses/course-info.service';
import { SideNavService }         from './side-nav.service';
import { NotificationsService }   from 'angular2-notifications';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  moduleId: module.id,
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() title: string;
  activeTab: string;
  selected;
  itemList; //array of courses or academic years
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private courseInfoService: CourseInfoService,
    private sideNavService: SideNavService,
    private notificationsService: NotificationsService,
    private router: Router )
  {
    router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((event: NavigationEnd) => {
      // Use urlAfterRedirects because when you first load the app from / it
      // redirects, so only event.url will give / as result
      if(event.urlAfterRedirects == "/app/manage-courses"){
        this.activeTab = "courses";

        this.sideNavService.getCourses$
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          courses => {
            this.itemList = courses;
        });
        courseInfoService.courseSelected$
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          course => {
            this.selected = course;
        });
        courseInfoService.courseDeleted$
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          course => {
            this.selected = null;
            this.sideNavService.deleteCourse(course);
        });
        courseInfoService.courseEdited$
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          course => {
            this.sideNavService.editCourse(course);
        });
      }
      else if(event.urlAfterRedirects == "/app/manage-tests"){
        this.activeTab = "tests";
      }
    });
  }

  ngOnInit() {}

  openCourseModal() {
    (<any>$('#newCourseModal')).openModal();
  }

  openYearModal() {
    (<any>$('#newYearModal')).openModal();
  }

  select(item) {
    this.selected = item;
    if(this.activeTab == "courses")
      this.courseInfoService.announceSelectCourse(item);
    (<any>$(".button-collapse")).sideNav('hide');
  }

  create(name: string): void {
    name = name.trim();
    if (!name) { return; }
    if(this.activeTab == "courses"){
      this.courseService.create(name)
        .then(course => {
          this.sideNavService.addCourse(course);
          this.courseInfoService.announceSelectCourse(course);
        })
        .catch(() => this.notificationsService.error("Error", "Al crear la asignatura: " + name));
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private indexOf(array, itemId) {
      for (var i = 0; i < array.length; i++) {
          if (array[i].id === itemId) return i;
      }
      return -1;
  }
}
