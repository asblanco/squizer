import { AfterViewInit, Component, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

import { APP_CONFIG } from '../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../shared/app-config/iapp-config';
import { CourseService } from '../../../db/course.service';
import { CoursesSideNavService } from '../courses-sidenav.service';
import { I18nService } from '../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements AfterViewInit {
  newCourseModal = new EventEmitter<string|MaterializeAction>();
  maxLengthCourse: number;
  title: string;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private courseService: CourseService,
    private coursesSideNavService: CoursesSideNavService,
    private i18nService: I18nService,
    private router: Router,
  ) {
    this.maxLengthCourse = config.MAXLENGTH_COURSE;
  }

  ngAfterViewInit() {
    (<any>$('#newCourseModal')).appendTo('body');
  }

  openCourseModal() {
    this.newCourseModal.emit({action: 'modal', params: ['open']});
    (<any>$('.button-collapse')).sideNav('hide');
  }

  createCourse(form): void {
    const name = form.value.title;
    if (!name) { return; }

    this.courseService.create(name)
      .then(course => {
        this.coursesSideNavService.addCourse(course);
        this.router.navigate(['/manage-courses/course/' + course.id]);
      })
      .catch(() => {this.i18nService.error(25, name); console.log('new course failed');});
  }

}
