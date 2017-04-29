import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { SchoolYearService } from '../../db/school-year.service';
import { SchoolYear } from '../../db/school-year';
import { TestsSideNavService } from '../tests-side-nav/tests-side-nav.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-school-year',
  templateUrl: './new-school-year.component.html',
  styleUrls: ['./new-school-year.component.css']
})
export class NewSchoolYearComponent implements OnChanges {
  newSchoolYearForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private schoolYearService: SchoolYearService,
    private testsSideNavService: TestsSideNavService,
    private notificationsService: NotificationsService
  ) {
    this.createForm();
  }

  ngOnChanges() {
    this.createForm();
  }

  createForm() {
    this.newSchoolYearForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      calls: this.fb.array([])
    });
  }

  onSubmit() {
    this.schoolYearService.create(this.newSchoolYearForm.value)
    .then(schoolYear => {
      this.testsSideNavService.addSchoolYear(schoolYear);
      this.testsSideNavService.announceSelected(schoolYear, null);
    })
    .catch(() => this.notificationsService.error('Error', 'Al crear curso: ' + this.newSchoolYearForm.value.title));

    this.ngOnChanges();
  }

}
