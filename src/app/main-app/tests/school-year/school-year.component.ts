import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { SchoolYear } from '../../db/school-year';
import { SchoolYearService } from '../../db/school-year.service';
import { TestsService } from '../tests.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-school-year',
  templateUrl: './school-year.component.html',
  styleUrls: ['./school-year.component.css']
})
export class SchoolYearComponent implements OnInit {
  schoolYear: SchoolYear = null;
  schoolYearId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private router: Router,
    private schoolYearService: SchoolYearService,
    private testsService: TestsService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
       this.schoolYearId = params['syId'];
       this.getSchoolYear(this.schoolYearId);
     });
  }

  ngOnInit() {
  }

  openEditSchoolYearModal() {
      (<any>$('#editSchoolYearModal' + this.schoolYear.id)).openModal();
  }

  getSchoolYear(id: number) {
    this.schoolYearService.getSchoolYear(id)
    .then(schoolYear => {
      this.schoolYear = schoolYear;
      this.testsService.announceSelected(schoolYear.id, null);
    })
    .catch(() => this.notificationsService.error('Error', 'Al descargar los datos del curso.'));
  }

  deleteSchoolYear() {
    this.schoolYearService
      .delete(this.schoolYear.id)
      .then(() => {
        this.testsService.deleteSchoolYear(this.schoolYear);
        this.router.navigate(['/manage-tests/']);
      })
      .catch(() => this.notificationsService.error('Error', 'Al eliminar curso ' + this.schoolYear.title));
  }

}
