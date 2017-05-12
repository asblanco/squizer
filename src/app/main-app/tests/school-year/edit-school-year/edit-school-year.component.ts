import { Component, EventEmitter, Inject, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SchoolYear } from '../../../db/school-year';
import { SchoolYearService } from '../../../db/school-year.service';
import { TestsService } from '../../tests.service';
import { APP_CONFIG } from '../../../shared/app-config/app-config';
import { IAppConfig } from '../../../shared/app-config/iapp-config';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-school-year',
  templateUrl: './edit-school-year.component.html',
  styleUrls: ['./edit-school-year.component.css']
})
export class EditSchoolYearComponent implements OnChanges {
  @Input() schoolYear: SchoolYear;
  editSchoolYearForm: FormGroup;
  editSchoolYearModal = new EventEmitter<string|MaterializeAction>();
  deleteSchoolYearModal = new EventEmitter<string|MaterializeAction>();
  maxLengthSchoolYear: number;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private fb: FormBuilder,
    private schoolYearService: SchoolYearService,
    private testsService: TestsService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {
    this.maxLengthSchoolYear = config.MAXLENGTH_SCHOOLYEAR;
    this.createForm();
  }

  ngAfterViewInit() {
    (<any>$('#editSchoolYearModal' + this.schoolYear.id)).appendTo('body');
  }

  openEditSchoolYearModal() {
    this.editSchoolYearModal.emit({action:"modal",params:['open']});
  }

  openDeleteSchoolYearModal() {
    this.deleteSchoolYearModal.emit({action:"modal",params:['open']});
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
    this.editSchoolYearForm.reset({
      id: this.schoolYear.id,
      title: this.schoolYear.title,
      start_date: <Date>(this.schoolYear.start_date),
      end_date: <Date>(this.schoolYear.end_date)
    });
  }

  onSubmit() {
    // Set calls array here because the form could have been initialized before
    // the user modified the calls array, so in this form the array is not updated
    const callFGs = this.schoolYear.calls.map(call => this.fb.group(call));
    const callFormArray = this.fb.array(callFGs);
    this.editSchoolYearForm.setControl('calls', callFormArray);

    this.schoolYearService.update(this.editSchoolYearForm.value)
    .then(schoolYear => {
      this.schoolYear.title = schoolYear.title;
      this.schoolYear.start_date = schoolYear.start_date;
      this.schoolYear.end_date = schoolYear.end_date;
      this.testsService.updateSchoolYear(schoolYear);
      this.ngOnChanges();
    })
    .catch(() => {
      this.notificationsService.error('Error', 'Al editar curso: ' + this.editSchoolYearForm.value.title);
      this.ngOnChanges();
    });
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
