import { Component, OnDestroy, OnInit } from '@angular/core';
import { Call } from '../../db/call';
import { Course } from '../../db/course';
import { SchoolYearService } from '../../db/school-year.service';
import { SchoolYear } from '../../db/school-year';
import { TestsSideNavService } from './../tests-side-nav/tests-side-nav.service';
import { NotificationsService } from 'angular2-notifications';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-school-year',
  templateUrl: './school-year.component.html',
  styleUrls: ['./school-year.component.css']
})
export class SchoolYearComponent implements OnDestroy, OnInit {
  courses: Course[] = [];   // Pass it to every call component
  schoolYears: SchoolYear[] = [];   // Initialize create call modals for each school year
  selectedCall: Call = null;
  selectedSchoolYear: SchoolYear = null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private testsSideNavService: TestsSideNavService,
    private schoolYearService: SchoolYearService,
    private notificationsService: NotificationsService
  ) {
    this.testsSideNavService.getSchoolYears$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      schoolYears => {
        this.schoolYears = schoolYears;
    });
    this.testsSideNavService.getCourses$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      courses => {
        this.courses = courses;
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
    this.testsSideNavService.removedCall$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      call => {
        this.selectedCall = null;
    });
  }

  ngOnInit() {
  }

  openEditSchoolYearModal() {
    (<any>$('#editSchoolYearModal' + this.selectedSchoolYear.id)).openModal();
  }

  deleteSchoolYear() {
    this.schoolYearService
      .delete(this.selectedSchoolYear.id)
      .then(() => {
        this.testsSideNavService.announceDeleteSchoolYear(this.selectedSchoolYear);
        this.selectedSchoolYear = null;
      })
      .catch(() => this.notificationsService.error('Error', 'Al eliminar curso ' + this.selectedSchoolYear.title));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
