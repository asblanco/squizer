import { Component, OnInit, OnDestroy, Output, Input, AfterViewInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

import { AuthService } from '../../shared/auth/auth.service';
import { TestsService } from '../tests/tests.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  activeTab: number; // 1=courses, 2=tests
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private auth: AuthService,
    private testsService: TestsService,
    private router: Router
  ) {
    router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((event: NavigationEnd) => {
        const trigger = event.urlAfterRedirects;
        const regexpCourses = new RegExp('/manage-courses.*');
        const regexpTests = new RegExp('/manage-tests.*');

        if (regexpCourses.test(trigger)) {
          this.activeTab = 1;
        } else if (regexpTests.test(trigger)) {
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

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
