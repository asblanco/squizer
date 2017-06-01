import { Component, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SchoolYear } from '../../db/school-year';
import { TestsSideNavService } from '../tests-sidenav/tests-sidenav.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-tests-sidenav',
  templateUrl: './tests-sidenav.component.html',
  styleUrls: ['./tests-sidenav.component.css']
})
export class TestsSideNavComponent {
  schoolYears$: Observable<SchoolYear[]>;
  selectedCallId = null;
  selectedSchoolYearId = null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private testsSideNavService: TestsSideNavService
  ) {
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((event: NavigationEnd) => {
      let trigger = event.urlAfterRedirects;
      let regexpSchoolYear = new RegExp('/manage-tests/school-year/[1-9]+');
      let regexpCall = new RegExp('/manage-tests/school-year/[0-9]+/call/[0-9]+');

      if (event.urlAfterRedirects === '/manage-tests') {
        this.selectedSchoolYearId = null;
        this.selectedCallId = null;
      } else if (regexpCall.test(trigger)) {
        let splitted = trigger.split("/", 6);
        this.selectedSchoolYearId = +splitted[3];
        this.selectedCallId = +splitted[5];
      } else if (regexpSchoolYear.test(trigger)) {
        let splitted = trigger.split("/", 4);
        this.selectedSchoolYearId = +splitted[3];
        this.selectedCallId = null;
      }
    });

    this.schoolYears$ = testsSideNavService.getSchoolYears$;
  }
}
