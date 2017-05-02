import { Injectable } from '@angular/core';
import { Call } from '../../db/call';
import { Course } from '../../db/course';
import { CourseService } from '../../db/course.service';
import { NotificationsService } from 'angular2-notifications';
import { SchoolYear } from '../../db/school-year';
import { SchoolYearService } from '../../db/school-year.service';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class TestsSideNavService {
  courses: Course[] = [];
  schoolYears: SchoolYear[] = [];

  // Observable string sources
  private coursesList = new Subject<Course[]>();
  private editCall = new Subject<Call>();
  private editSchoolYear = new Subject<SchoolYear>();
  private newSchoolYear = new Subject<SchoolYear>();
  private removeCall = new Subject<Call>();
  private removeSchoolYear = new Subject<SchoolYear>();
  private schoolYearList = new Subject<SchoolYear[]>();
  private selectCall = new Subject<any>();
  private selectSchoolYear = new Subject<any>();

  // Observable string streams
  addedSchoolYear$ = this.newSchoolYear.asObservable();
  editedCall$ = this.editCall.asObservable();
  editedSchoolYear$ = this.editSchoolYear.asObservable();
  getCourses$ = this.coursesList.asObservable();
  getSchoolYears$ = this.schoolYearList.asObservable();
  removedCall$ = this.removeCall.asObservable();
  removedSchoolYear$ = this.removeSchoolYear.asObservable();
  selectedCall$ = this.selectCall.asObservable();
  selectedSchoolYear$ = this.selectSchoolYear.asObservable();

  constructor(
    private courseService: CourseService,
    private notificationsService: NotificationsService,
    private schoolYearService: SchoolYearService
  ) {}

  getLists() {
    this.schoolYearService.getSchoolYears()
    .then(schoolYears => { this.announceSchoolYearList(schoolYears); })
    .catch(() => this.notificationsService.error('Error', 'Al descargar la lista de cursos.'));

    this.courseService.getCourses()
    .then(courses => { this.announceCoursesList(courses); })
    .catch(() => this.notificationsService.error('Error', 'Al descargar la lista de asignaturas.'));
  }

  announceSchoolYearList(schoolYears: SchoolYear[]) {
    this.schoolYears = schoolYears;
    this.schoolYearList.next(schoolYears);
  }

  announceCoursesList(courses: Course[]) {
    this.courses = courses;
    this.coursesList.next(courses);
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
    const schoolYearIndex = this.indexOf(this.schoolYears, call.school_year);

    this.schoolYears[schoolYearIndex].calls.push(call);
  }

  updateCall(call: Call) {
    const schoolYearIndex = this.indexOf(this.schoolYears, call.school_year);
    const callIndex = this.indexOf(this.schoolYears[schoolYearIndex].calls, call.id);

    this.schoolYears[schoolYearIndex].calls.splice(callIndex, 1, call);
  }

  deleteCall(call: Call) {
    const schoolYearIndex = this.indexOf(this.schoolYears, call.school_year);
    const callIndex = this.indexOf(this.schoolYears[schoolYearIndex].calls, call.id);

    this.schoolYears[schoolYearIndex].calls.splice(callIndex, 1);
  }

  private indexOf(array, itemId) {
      for (let i = 0; i < array.length; i++) {
          if (array[i].id === itemId) { return i; }
      }
      return -1;
  }
}
