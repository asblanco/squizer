import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

import { CoursesSideNavService } from './courses-side-nav/courses-side-nav.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnDestroy {
  selectedCourse = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private coursesSideNavService: CoursesSideNavService
  ) {
    this.coursesSideNavService.getCourses();
    
    router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/manage-courses') {
        this.selectedCourse = false;
      } else {
        this.selectedCourse = true;
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
