import { Injectable } from '@angular/core';
import { Call } from '../../db/call';
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
  private editCall = new Subject<Call>();
  private removeSchoolYear = new Subject<SchoolYear>();
  private removeCall = new Subject<Call>();
  private selectSchoolYear = new Subject<any>();
  private selectCall = new Subject<any>();

  // Observable string streams
  getSchoolYears$ = this.schoolYearList.asObservable();
  addedSchoolYear$ = this.newSchoolYear.asObservable();
  editedSchoolYear$ = this.editSchoolYear.asObservable();
  editedCall$ = this.editCall.asObservable();
  removedSchoolYear$ = this.removeSchoolYear.asObservable();
  removedCall$ = this.removeCall.asObservable();
  selectedSchoolYear$ = this.selectSchoolYear.asObservable();
  selectedCall$ = this.selectCall.asObservable();

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
    this.updateSchoolYear(schoolYear);
  }

  announceEditCall(call: Call) {
    this.editCall.next(call);
    this.updateCall(call);
  }

  announceDeleteSchoolYear(schoolYear: SchoolYear) {
    this.removeSchoolYear.next(schoolYear);
    this.deleteSchoolYear(schoolYear);
  }

  announceDeleteCall(call: Call) {
    this.removeCall.next(call);
    this.deleteCall(call);
  }

  announceSelected(schoolYear: SchoolYear, call: Call) {
    this.selectSchoolYear.next(schoolYear);
    this.selectCall.next(call);
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

  addCall(call: Call) {
    const schoolYearID = this.indexOf(this.schoolYears, call.school_year);

    this.schoolYears[schoolYearID].calls.push(call);
  }

  updateCall(call: Call) {
    const schoolYearID = this.indexOf(this.schoolYears, call.school_year);
    const callID = this.indexOf(this.schoolYears[schoolYearID].calls, call.id);

    this.schoolYears[schoolYearID].calls.splice(callID, 1, call);
  }

  deleteCall(call: Call) {
    const schoolYearID = this.indexOf(this.schoolYears, call.school_year);
    const callID = this.indexOf(this.schoolYears[schoolYearID].calls, call.id);

    this.schoolYears[schoolYearID].calls.splice(callID, 1);
  }

  private indexOf(array, itemId) {
      for (let i = 0; i < array.length; i++) {
          if (array[i].id === itemId) { return i; }
      }
      return -1;
  }
}
