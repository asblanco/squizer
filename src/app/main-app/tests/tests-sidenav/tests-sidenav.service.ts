import { Injectable } from '@angular/core';

import { Call } from '../../db/call';
import { Course } from '../../db/course';
import { i18nService } from '../../../shared/i18n/i18n.service';
import { SchoolYear } from '../../db/school-year';
import { SchoolYearService } from '../../db/school-year.service';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class TestsSideNavService {
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
    private i18nService: i18nService,
    private schoolYearService: SchoolYearService
  ) {}

  getSchoolYears() {
    this.schoolYearService.getSchoolYears()
    .then(schoolYears => { this.announceSchoolYearList(schoolYears); })
    .catch(() => this.i18nService.error(2, ''));
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
    schoolYear.calls = this.schoolYears[this.indexOf(this.schoolYears, schoolYear.id)].calls;
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
