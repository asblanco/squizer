import { Injectable } from '@angular/core';

import { Term } from '../../db/term';
import { Course } from '../../db/course';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { SchoolYear } from '../../db/schoolyear';
import { SchoolYearService } from '../../db/schoolyear.service';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class TestsSideNavService {
  schoolYears: SchoolYear[] = [];

  // Observable string sources
  private schoolYearList = new Subject<SchoolYear[]>();
  private selectTerm = new Subject<number>();
  private selectSchoolYear = new Subject<number>();

  // Observable string streams
  getSchoolYears$ = this.schoolYearList.asObservable();
  selectedTerm$ = this.selectTerm.asObservable();
  selectedSchoolYear$ = this.selectSchoolYear.asObservable();

  constructor(
    private i18nService: I18nService,
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

  announceSelected(schoolYearId: number, termId: number) {
    this.selectSchoolYear.next(schoolYearId);
    this.selectTerm.next(termId);
  }

  addSchoolYear(schoolYear: SchoolYear) {
    this.schoolYears.push(schoolYear);
    this.announceSchoolYearList(this.schoolYears);
  }

  updateSchoolYear(schoolYear: SchoolYear) {
    schoolYear.terms = this.schoolYears[this.indexOf(this.schoolYears, schoolYear.id)].terms;
    this.schoolYears.splice(this.indexOf(this.schoolYears, schoolYear.id), 1, schoolYear);
    this.announceSchoolYearList(this.schoolYears);
  }

  deleteSchoolYear(schoolYear: SchoolYear) {
    this.schoolYears.splice(this.indexOf(this.schoolYears, schoolYear.id), 1);
    this.announceSchoolYearList(this.schoolYears);
    this.announceSelected(null, null);
  }

  addTerm(term: Term) {
    const schoolYearIndex = this.indexOf(this.schoolYears, term.schoolyear);

    this.schoolYears[schoolYearIndex].terms.push(term);
    this.announceSchoolYearList(this.schoolYears);
  }

  updateTerm(term: Term) {
    const schoolYearIndex = this.indexOf(this.schoolYears, term.schoolyear);
    const termIndex = this.indexOf(this.schoolYears[schoolYearIndex].terms, term.id);

    this.schoolYears[schoolYearIndex].terms.splice(termIndex, 1, term);
    this.announceSchoolYearList(this.schoolYears);
  }

  deleteTerm(term: Term) {
    const schoolYearIndex = this.indexOf(this.schoolYears, term.schoolyear);
    const termIndex = this.indexOf(this.schoolYears[schoolYearIndex].terms, term.id);

    this.schoolYears[schoolYearIndex].terms.splice(termIndex, 1);
    this.announceSchoolYearList(this.schoolYears);
    this.selectTerm.next(null);
  }

  private indexOf(array, itemId) {
      for (let i = 0; i < array.length; i++) {
          if (array[i].id === itemId) { return i; }
      }
      return -1;
  }
}
