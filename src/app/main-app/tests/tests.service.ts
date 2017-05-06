import { Injectable } from '@angular/core';

import { Call } from '../db/call';
import { Course } from '../db/course';
import { NotificationsService } from 'angular2-notifications';
import { SchoolYear } from '../db/school-year';
import { SchoolYearService } from '../db/school-year.service';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class TestsService {
  schoolYears: SchoolYear[] = [];

  // Observable string sources
  private schoolYearList = new Subject<SchoolYear[]>();
  private selectCall = new Subject<number>();
  private selectSchoolYear = new Subject<number>();

  // Observable string streams
  getSchoolYears$ = this.schoolYearList.asObservable();
  selectedCall$ = this.selectCall.asObservable();
  selectedSchoolYear$ = this.selectSchoolYear.asObservable();

  constructor(
    private notificationsService: NotificationsService,
    private schoolYearService: SchoolYearService
  ) {
    this.getSchoolYears();
  }

  getSchoolYears() {
    this.schoolYearService.getSchoolYears()
    .then(schoolYears => { this.announceSchoolYearList(schoolYears); })
    .catch(() => this.notificationsService.error('Error', 'Al descargar la lista de cursos.'));
  }

  announceSchoolYearList(schoolYears: SchoolYear[]) {
    this.schoolYears = schoolYears;
    this.schoolYearList.next(schoolYears);
  }

  announceSelected(schoolYearId: number, callId: number) {
    this.selectSchoolYear.next(schoolYearId);
    this.selectCall.next(callId);
  }

  addSchoolYear(schoolYear: SchoolYear) {
    this.schoolYears.push(schoolYear);
    this.announceSchoolYearList(this.schoolYears);
  }

  updateSchoolYear(schoolYear: SchoolYear) {
    this.schoolYears.splice(this.indexOf(this.schoolYears, schoolYear.id), 1, schoolYear);
    this.announceSchoolYearList(this.schoolYears);
  }

  deleteSchoolYear(schoolYear: SchoolYear) {
    this.schoolYears.splice(this.indexOf(this.schoolYears, schoolYear.id), 1);
    this.announceSchoolYearList(this.schoolYears);
    this.announceSelected(null, null);
  }

  addCall(call: Call) {
    const schoolYearIndex = this.indexOf(this.schoolYears, call.school_year);

    this.schoolYears[schoolYearIndex].calls.push(call);
    this.announceSchoolYearList(this.schoolYears);
  }

  updateCall(call: Call) {
    const schoolYearIndex = this.indexOf(this.schoolYears, call.school_year);
    const callIndex = this.indexOf(this.schoolYears[schoolYearIndex].calls, call.id);

    this.schoolYears[schoolYearIndex].calls.splice(callIndex, 1, call);
    this.announceSchoolYearList(this.schoolYears);
  }

  deleteCall(call: Call) {
    const schoolYearIndex = this.indexOf(this.schoolYears, call.school_year);
    const callIndex = this.indexOf(this.schoolYears[schoolYearIndex].calls, call.id);

    this.schoolYears[schoolYearIndex].calls.splice(callIndex, 1);
    this.announceSchoolYearList(this.schoolYears);
    this.selectCall.next(null);
  }

  private indexOf(array, itemId) {
      for (let i = 0; i < array.length; i++) {
          if (array[i].id === itemId) { return i; }
      }
      return -1;
  }
}
