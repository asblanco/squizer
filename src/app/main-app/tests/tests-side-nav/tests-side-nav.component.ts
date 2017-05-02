import { Component, OnDestroy, OnInit } from '@angular/core';
import { Call } from '../../db/call';
import { SchoolYear } from '../../db/school-year';
import { TestsSideNavService } from './tests-side-nav.service';
import { NotificationsService } from 'angular2-notifications';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-tests-side-nav',
  templateUrl: './tests-side-nav.component.html',
  styleUrls: ['./tests-side-nav.component.css']
})
export class TestsSideNavComponent implements OnDestroy, OnInit {
  schoolYears: SchoolYear[] = [];
  selectedSchoolYear: SchoolYear = null;
  selectedCall: Call = null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private notificationsService:  NotificationsService,
    private testsSideNavService: TestsSideNavService
  ) {
    this.testsSideNavService.getSchoolYears$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYears => {
        this.schoolYears = schoolYears;
    });
    this.testsSideNavService.selectedSchoolYear$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYear => {
        this.selectedSchoolYear = schoolYear;
    });
    this.testsSideNavService.selectedCall$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      call => {
        this.selectedCall = call;
    });
    this.testsSideNavService.editedSchoolYear$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYear => {
        this.selectedSchoolYear = schoolYear;
    });
    this.testsSideNavService.editedCall$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      call => {
        this.selectedCall = call;
    });
    this.testsSideNavService.removedSchoolYear$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYear => {
        this.selectedSchoolYear = null;
    });
    this.testsSideNavService.removedCall$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      call => {
        this.selectedCall = null;
    });
  }

  ngOnInit() {
  }

  openSchoolYearModal() {
    (<any>$('#newSchoolYearModal')).openModal();
  }

  openNewCallModal(schoolYear: SchoolYear) {
    (<any>$('#newCallModal' + schoolYear.id)).openModal();
  }

  selectSchoolYear(schoolYear: SchoolYear) {
    this.testsSideNavService.announceSelected(schoolYear, null);
  }

  selectCall(schoolYear: SchoolYear, call: Call) {
    this.testsSideNavService.announceSelected(schoolYear, call);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
