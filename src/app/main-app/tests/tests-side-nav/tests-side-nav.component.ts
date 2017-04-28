import { Component, OnDestroy, OnInit } from '@angular/core';
import { SchoolYearService } from '../../db/school-year.service';
import { SchoolYear } from '../../db/school-year';
import { TestsSideNavService } from './tests-side-nav.service';
import { NotificationsService } from 'angular2-notifications';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-tests-side-nav',
  templateUrl: './tests-side-nav.component.html',
  styleUrls: ['./tests-side-nav.component.css'],
  providers: [SchoolYearService]
})
export class TestsSideNavComponent implements OnDestroy, OnInit {
  schoolYears: SchoolYear[] = [];
  selected: SchoolYear;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private schoolYearService: SchoolYearService,
    private testsSideNavService: TestsSideNavService,
    private notificationsService:  NotificationsService
  ) {
    this.testsSideNavService.getSchoolYears$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYears => {
        this.schoolYears = schoolYears;
    });
    this.testsSideNavService.selected$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYear => {
        this.selected = schoolYear;
    });
    this.testsSideNavService.editedSchoolYear$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYear => {
        this.selected = schoolYear;
        this.testsSideNavService.updateSchoolYear(schoolYear);
    });
    this.testsSideNavService.removedSchoolYear$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYear => {
        this.selected = null;
        this.testsSideNavService.deleteSchoolYear(schoolYear);
    });
  }

  ngOnInit() {
  }

  openSchoolYearModal() {
    (<any>$('#newSchoolYearModal')).openModal();
  }

  select(schoolYear: SchoolYear) {
    this.testsSideNavService.announceSelected(schoolYear);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
