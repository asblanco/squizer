import { Component, OnDestroy, OnInit } from '@angular/core';
import { SchoolYearService } from '../db/school-year.service';
import { SchoolYear } from '../db/school-year';
import { TestsSideNavService } from './tests-side-nav/tests-side-nav.service';
import { NotificationsService } from 'angular2-notifications';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnDestroy, OnInit {
  selectedYear: SchoolYear;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private testsSideNavService: TestsSideNavService,
    private schoolYearService: SchoolYearService,
    private notificationsService: NotificationsService
  ) {
    this.testsSideNavService.selected$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYear => {
        this.selectedYear = schoolYear;
    });
    this.testsSideNavService.editedSchoolYear$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYear => {
        this.selectedYear = schoolYear;
    });
  }

  ngOnInit() {
  }

  openDeleteCallModal() {
    (<any>$('#deleteCallModal')).openModal();
  }

  openEditSchoolYearModal() {
    (<any>$('#editSchoolYearModal' + this.selectedYear.id)).openModal();
  }

  deleteSchoolYear() {
    this.schoolYearService
        .delete(this.selectedYear.id)
        .then(() => {
          this.testsSideNavService.announceDeleteSchoolYear(this.selectedYear);
          this.selectedYear = null;
        })
        .catch(() => this.notificationsService.error('Error', 'Al eliminar curso ' + this.selectedYear.title));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
