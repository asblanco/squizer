import { Component, OnInit, OnDestroy, Output, Input, AfterViewInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

import { AuthService } from '../../shared/auth/auth.service';
import { CoursesSideNavService } from '../courses/courses-sidenav/courses-sidenav.service';
import { TestsSideNavService } from '../tests/tests-sidenav/tests-sidenav.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  activeTab = 0; // 1=courses, 2=tests
  username: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private auth: AuthService,
    private coursesSideNavService: CoursesSideNavService,
    private testsSideNavService: TestsSideNavService,
    private router: Router
  ) {
    router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((event: NavigationEnd) => {
        const trigger = event.urlAfterRedirects;
        const regexpCourses = new RegExp('/manage-courses.*');
        const regexpTests = new RegExp('/manage-tests.*');

        if (regexpCourses.test(trigger) && this.activeTab != 1) {
          this.activeTab = 1;
          this.coursesSideNavService.getCourses();
        } else if (regexpTests.test(trigger) && this.activeTab != 2) {
          this.activeTab = 2;
          testsSideNavService.getSchoolYears();
        }
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  ngAfterViewInit() {
    (<any>$('.button-collapse')).sideNav();
  }

  select() {
    (<any>$('.button-collapse')).sideNav('hide');
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
