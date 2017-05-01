import { Component, OnInit, OnDestroy, Output, Input, AfterViewInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

import { CoursesSideNavService } from '../courses/courses-side-nav/courses-side-nav.service';
import { TestsSideNavService } from '../tests/tests-side-nav/tests-side-nav.service';

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
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private coursesSideNavService: CoursesSideNavService,
    private testsSideNavService: TestsSideNavService,
    private router: Router
  ) {
    router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/app/manage-courses') {
        this.coursesSideNavService.getCourses();
        this.activeTab = 1;
      } else if (event.urlAfterRedirects === '/app/manage-tests') {
        this.testsSideNavService.getLists();
        this.activeTab = 2;
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    (<any>$('.button-collapse')).sideNav();
  }

  select() {
    (<any>$('.button-collapse')).sideNav('hide');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
