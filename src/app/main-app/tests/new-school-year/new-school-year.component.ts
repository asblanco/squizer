import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SchoolYear } from '../../db/school-year';
import { SchoolYearService } from '../../db/school-year.service';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-school-year',
  templateUrl: './new-school-year.component.html',
  styleUrls: ['./new-school-year.component.css']
})
export class NewSchoolYearComponent implements OnChanges, AfterViewInit {
  @Input() schoolYears: SchoolYear[];
  newSchoolYearForm: FormGroup;
  newSchoolYearModal = new EventEmitter<string|MaterializeAction>();
  maxLengthSchoolYear: number;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private fb: FormBuilder,
    private schoolYearService: SchoolYearService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {
    this.maxLengthSchoolYear = config.MAXLENGTH_SCHOOLYEAR;
    this.createForm();
  }

  ngAfterViewInit() {
    (<any>$('#newSchoolYearModal')).appendTo('body');
  }

  ngOnChanges() {
    this.createForm();
  }

  openSchoolYearModal() {
    this.newSchoolYearModal.emit({action:"modal",params:['open']});
  }

  createForm() {
    this.newSchoolYearForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthSchoolYear)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      calls: this.fb.array([])
    });
  }

  onSubmit() {
    this.schoolYearService.create(this.newSchoolYearForm.value)
    .then(schoolYear => {
      this.schoolYears.push(schoolYear);
      this.router.navigate(['/manage-tests/school-year/' + schoolYear.id]);
    })
    .catch(() => this.notificationsService.error('Error', 'Al crear curso: ' + this.newSchoolYearForm.value.title));

    this.ngOnChanges();
  }

}
