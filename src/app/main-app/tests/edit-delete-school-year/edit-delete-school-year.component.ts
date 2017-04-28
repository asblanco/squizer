import { Component, Input, OnChanges } from '@angular/core';
import { SchoolYearService } from '../../db/school-year.service';
import { TestsSideNavService } from '../tests-side-nav/tests-side-nav.service';
import { SchoolYear } from '../../db/school-year';
import { Call } from '../../db/call';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-delete-school-year',
  templateUrl: './edit-delete-school-year.component.html',
  styleUrls: ['./edit-delete-school-year.component.css']
})
export class EditDeleteSchoolYearComponent implements OnChanges {
  @Input() schoolYear: SchoolYear;
  editSchoolYearForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private schoolYearService: SchoolYearService,
    private testsSideNavService: TestsSideNavService,
    private notificationsService: NotificationsService
  ) {
    this.createForm();
  }

  openDeleteSchoolYearModal() {
    (<any>$('#deleteSchoolYearModal' + this.schoolYear.id)).openModal();
  }

  ngOnChanges() {
    this.setForm();
  }

  createForm() {
    this.editSchoolYearForm = this.fb.group({
      id: 0,
      title: ['', [Validators.required, Validators.minLength(5)]],
      start_date: [new Date(), [Validators.required]],
      end_date: [new Date(), [Validators.required]],
      calls: this.fb.array([])
    });
  }

  setForm() {
    const callFGs = this.schoolYear.calls.map(call => this.fb.group(call));
    this.editSchoolYearForm.reset({
      id: this.schoolYear.id,
      title: this.schoolYear.title,
      start_date: <Date>(this.schoolYear.start_date),
      end_date: <Date>(this.schoolYear.end_date),
      calls: this.fb.array(callFGs)
    });
  }

  onSubmit() {
    this.schoolYearService.update(this.editSchoolYearForm.value)
    .then(schoolYear => {
      this.testsSideNavService.announceEditSchoolYear(schoolYear);
    })
    .catch(() => this.notificationsService.error('Error', 'Al editar curso: ' + this.editSchoolYearForm.value.title));
    this.ngOnChanges();
  }

}
