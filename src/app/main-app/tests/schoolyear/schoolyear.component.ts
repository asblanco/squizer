import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SchoolYear } from '../../db/schoolyear';
import { SchoolYearService } from '../../db/schoolyear.service';
import { TestsSideNavService } from '../tests-sidenav/tests-sidenav.service';
import { i18nService } from '../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-schoolyear',
  templateUrl: './schoolyear.component.html',
  styleUrls: ['./schoolyear.component.css']
})
export class SchoolYearComponent {
  schoolYear: SchoolYear = null;
  schoolYearId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private i18nService: i18nService,
    private schoolYearService: SchoolYearService,
    private testsSideNavService: TestsSideNavService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
       this.schoolYearId = params['syId'];
       this.getSchoolYear(this.schoolYearId);
     });
  }

  getSchoolYear(id: number) {
    this.schoolYearService.getSchoolYear(id)
    .then(schoolYear => {
      this.schoolYear = schoolYear;
      this.testsSideNavService.announceSelected(schoolYear.id, null);
    })
    .catch(() => this.i18nService.error(1, ''));
  }

}
