import { AfterViewInit, Component, EventEmitter, Inject, Input } from '@angular/core';
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
export class EditSchoolYearComponent implements AfterViewInit {
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

  createForm() {
    this.editSchoolYearForm = this.fb.group({
      id: 0,
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthSchoolYear)]],
      start_date: [new Date(), [Validators.required]],
      end_date: [new Date(), [Validators.required]],
    });
  }

  onSubmit() {
    this.editSchoolYearForm.value.id = this.schoolYear.id;
    
    this.schoolYearService.update(this.editSchoolYearForm.value)
    .then(schoolYear => {
      this.schoolYear.title = schoolYear.title;
      this.schoolYear.start_date = schoolYear.start_date;
      this.schoolYear.end_date = schoolYear.end_date;
      this.testsSideNavService.updateSchoolYear(schoolYear);
    })
    .catch(() => {
      this.i18nService.error(4, this.editSchoolYearForm.value.title);
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
