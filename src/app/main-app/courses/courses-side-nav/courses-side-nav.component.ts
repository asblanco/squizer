import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from '../../db/course';
import { CourseService } from '../../db/course.service';
import { CoursesSideNavService } from './courses-side-nav.service';
import { NotificationsService } from 'angular2-notifications';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-courses-side-nav',
  templateUrl: './courses-side-nav.component.html',
  styleUrls: ['./courses-side-nav.component.css']
})
export class CoursesSideNavComponent {
  selectedCourseId: number;
  courses$: Observable<Course[]>;

  constructor(
    private courseService: CourseService,
    private coursesSideNavService: CoursesSideNavService,
    private notificationsService: NotificationsService,
    private router: Router,
  ) {
    this.courses$ = coursesSideNavService.getCourses$;
  }

  openCourseModal() {
    (<any>$('#newCourseModal')).appendTo('body').openModal();
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
