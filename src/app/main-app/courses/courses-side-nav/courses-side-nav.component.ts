import { Component, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { Course } from '../../db/course';
import { CourseService } from '../../db/course.service';
import { CoursesSideNavService } from './courses-side-nav.service';
import { NotificationsService } from 'angular2-notifications';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-courses-side-nav',
  templateUrl: './courses-side-nav.component.html',
  styleUrls: ['./courses-side-nav.component.css']
})
export class CoursesSideNavComponent {
  selectedCourseId: number;
  courses$: Observable<Course[]>;
  maxLengthCourse: number;
  newEditModal = new EventEmitter<string|MaterializeAction>();

  constructor(
    private courseService: CourseService,
    @Inject(APP_CONFIG) private config: IAppConfig,
    private coursesSideNavService: CoursesSideNavService,
    private notificationsService: NotificationsService,
    private router: Router,
  ) {
    this.maxLengthCourse = config.MAXLENGTH_COURSE;
    this.courses$ = coursesSideNavService.getCourses$;
  }

  openCourseModal() {
    this.newEditModal.emit({action:"modal",params:['open']});
  }

  createCourse(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.courseService.create(name)
      .then(course => {
        this.coursesSideNavService.addCourse(course);
        this.router.navigate(['/manage-courses/course/' + course.id]);
      })
      .catch(() => this.notificationsService.error('Error', 'Al crear la asignatura: ' + name));

    (<any>$('.button-collapse')).sideNav('hide');
  }

  selectCourse(id: number) {
    (<any>$('.button-collapse')).sideNav('hide');
    this.selectedCourseId = id;
  }
}
