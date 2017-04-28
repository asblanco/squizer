import { Injectable } from '@angular/core';
import { SchoolYear } from '../../db/school-year';
import { SchoolYearService } from '../../db/school-year.service';
import { NotificationsService } from 'angular2-notifications';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class TestsSideNavService {
  schoolYears: SchoolYear[] = [];
  // Observable string sources
  private schoolYearList = new Subject<SchoolYear[]>();
  private newSchoolYear = new Subject<SchoolYear>();
  private editSchoolYear = new Subject<SchoolYear>();
  private removeSchoolYear = new Subject<SchoolYear>();
  private select = new Subject<any>();
  // Observable string streams
  getSchoolYears$ = this.schoolYearList.asObservable();
  addedSchoolYear$ = this.newSchoolYear.asObservable();
  editedSchoolYear$ = this.editSchoolYear.asObservable();
  removedSchoolYear$ = this.removeSchoolYear.asObservable();
  selected$ = this.select.asObservable();

  constructor(
    private schoolYearService: SchoolYearService,
    private notificationsService: NotificationsService ) { }

  announceSchoolYearList(schoolYears: SchoolYear[]) {
    this.schoolYears = schoolYears;
    this.schoolYearList.next(schoolYears);
  }

  announceAddSchoolYear(schoolYear: SchoolYear) {
    this.newSchoolYear.next(schoolYear);
  }

  announceEditSchoolYear(schoolYear: SchoolYear) {
    this.editSchoolYear.next(schoolYear);
  }

  announceDeleteSchoolYear(schoolYear: SchoolYear) {
    this.removeSchoolYear.next(schoolYear);
  }

  announceSelected(item) {
    this.select.next(item);
  }

  addSchoolYear(schoolYear: SchoolYear) {
    this.schoolYears.push(schoolYear);
  }

  updateSchoolYear(schoolYear: SchoolYear) {
    this.schoolYears.splice(this.indexOf(this.schoolYears, schoolYear.id), 1, schoolYear);
  }

  deleteSchoolYear(schoolYear: SchoolYear) {
    this.schoolYears.splice(this.indexOf(this.schoolYears, schoolYear.id), 1);
  }

  private indexOf(array, itemId) {
      for (let i = 0; i < array.length; i++) {
          if (array[i].id === itemId) { return i; }
      }
      return -1;
  }
}
