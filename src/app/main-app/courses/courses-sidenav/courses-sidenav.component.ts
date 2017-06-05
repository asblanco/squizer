import { Component, EventEmitter, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { APP_CONFIG } from '../../../shared/app-config/app-config';
import { IAppConfig } from '../../../shared/app-config/iapp-config';
import { Course } from '../../db/course';
import { CourseService } from '../../db/course.service';
import { CoursesSideNavService } from './courses-sidenav.service';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

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
  maxLengthCourse: number;
  newEditModal = new EventEmitter<string|MaterializeAction>();
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private courseService: CourseService,
    @Inject(APP_CONFIG) private config: IAppConfig,
    private coursesSideNavService: CoursesSideNavService,
    private i18nService: I18nService,
    private router: Router,
  ) {
    this.maxLengthCourse = config.MAXLENGTH_COURSE;
    this.courses$ = coursesSideNavService.getCourses$;

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

  openCourseModal() {
    this.newEditModal.emit({action: 'modal', params: ['open']});
  }

  createCourse(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.courseService.create(name)
      .then(course => {
        this.coursesSideNavService.addCourse(course);
        this.router.navigate(['/manage-courses/course/' + course.id]);
      })
      .catch(() => this.i18nService.error(25, name));

    (<any>$('.button-collapse')).sideNav('hide');
  }

  selectCourse(id: number) {
    (<any>$('.button-collapse')).sideNav('hide');
  }
}
