import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SchoolYear } from '../../../db/schoolyear';
import { SchoolYearService } from '../../../db/schoolyear.service';
import { TestsSideNavService } from '../../../navbars/tests-sidenav/tests-sidenav.service';
import { APP_CONFIG } from '../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../shared/app-config/iapp-config';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { I18nService } from '../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-edit-schoolyear',
  templateUrl: './edit-schoolyear.component.html',
  styleUrls: ['./edit-schoolyear.component.css']
})
export class EditSchoolYearComponent implements AfterViewInit, OnChanges {
  @Input() schoolYear: SchoolYear;
  editSchoolYearForm: FormGroup;
  editSchoolYearModal = new EventEmitter<string|MaterializeAction>();
  deleteSchoolYearModal = new EventEmitter<string|MaterializeAction>();
  maxLengthSchoolYear: number;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private fb: FormBuilder,
    private schoolYearService: SchoolYearService,
    private testsSideNavService: TestsSideNavService,
    private router: Router,
    private i18nService: I18nService
  ) {
    this.maxLengthSchoolYear = config.MAXLENGTH_SCHOOLYEAR;
    this.createForm();
  }

  ngAfterViewInit() {
    (<any>$('#editSchoolYearModal' + this.schoolYear.id)).appendTo('body');
  }

  openEditSchoolYearModal() {
    this.editSchoolYearModal.emit({action: 'modal', params: ['open']});
  }

  openDeleteSchoolYearModal() {
    this.deleteSchoolYearModal.emit({action: 'modal', params: ['open']});
  }

  ngOnChanges() {
    this.setForm();
  }

  createForm() {
    this.editSchoolYearForm = this.fb.group({
      id: 0,
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthSchoolYear)]],
      start_date: [new Date(), [Validators.required]],
      end_date: [new Date(), [Validators.required]],
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
    this.schoolYearService.update(this.editSchoolYearForm.value)
    .then(schoolYear => {
      this.schoolYear.title = schoolYear.title;
      this.schoolYear.start_date = schoolYear.start_date;
      this.schoolYear.end_date = schoolYear.end_date;
      this.testsSideNavService.updateSchoolYear(schoolYear);
      this.ngOnChanges();
    })
    .catch(() => {
      this.i18nService.error(4, this.editSchoolYearForm.value.title);
      this.ngOnChanges();
    });
  }

  deleteSchoolYear() {
    this.schoolYearService
      .delete(this.schoolYear.id)
      .then(() => {
        this.testsSideNavService.deleteSchoolYear(this.schoolYear);
        this.router.navigate(['/manage-tests/']);
      })
      .catch(() => this.i18nService.error(5, this.schoolYear.title));
  }
}
