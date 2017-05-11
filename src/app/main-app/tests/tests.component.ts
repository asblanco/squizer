import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

import { TestsService } from './tests.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-tests',
  templateUrl: 'tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnDestroy {
  selectedSchoolYear = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private testsService: TestsService
  ) {
    this.testsService.getSchoolYears();

    router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/manage-tests') {
        this.selectedSchoolYear = false;
      } else {
        this.selectedSchoolYear = true;
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
