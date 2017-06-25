import { Component, EventEmitter, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Course } from '../../db/course';
import { CoursesSideNavService } from './courses-sidenav.service';
import { I18nService } from '../../../shared/i18n/i18n.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-courses-sidenav',
  templateUrl: './courses-sidenav.component.html',
  styleUrls: ['./courses-sidenav.component.css']
})
export class CoursesSideNavComponent {
  selectedCourseId: number;
  courses$: Observable<Course[]>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private coursesSideNavService: CoursesSideNavService,
    private i18nService: I18nService,
    private router: Router,
  ) {
    this.courses$ = coursesSideNavService.getCourses$;

    /*
    * Determine whether there nothing selected or a course selected, to reflect it on the UI of the sidenav
    */
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((event: NavigationEnd) => {
      const trigger = event.urlAfterRedirects;
      const regexp = new RegExp('/manage-courses/course/[1-9]+');

      if (event.urlAfterRedirects === '/manage-courses') {
        this.selectedCourseId = null;
      } else if (regexp.test(trigger)) {
        const splitted = trigger.split('/', 4);
        this.selectedCourseId = +splitted[3];
      }
    });
  }

  selectCourse(id: number) {
    (<any>$('.button-collapse')).sideNav('hide');
  }
}
