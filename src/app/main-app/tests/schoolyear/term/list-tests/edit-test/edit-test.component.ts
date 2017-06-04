import { Component, EventEmitter, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';

import { Test } from '../../../../../db/test';
import { TestService } from '../../../../../db/test.service';

import { APP_CONFIG } from '../../../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../../../shared/app-config/iapp-config'

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { i18nService } from '../../../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnChanges, OnInit {
  @Input() test: Test;
  testForm: Test = new Test();
  editTestModal = new EventEmitter<string|MaterializeAction>();
  maxLengthTest: number;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private fb: FormBuilder,
    private testService: TestService,
    private i18nService: i18nService
  ) {
    this.maxLengthTest = config.MAXLENGTH_TEST;
  }

  ngOnInit() {
    this.testForm = {
     id: this.test.id,
     title: this.test.title,
     course: this.test.course,
     term: this.test.term,
     creation_date: this.test.creation_date,
     questions: this.test.questions,
     answers: this.test.answers
   };
  }

  ngOnChanges() {
    this.testForm.title = this.test.title;
  }

  openEditTestModal(id) {
    this.editTestModal.emit({action: 'modal', params: ['open']});
  }

  updateTest() {
    this.testService.update(this.testForm)
    .then(test => {
      this.test.title = test.title;
      this.ngOnChanges();
    })
    .catch(() => {
      this.i18nService.error(15, this.test.title);
      this.ngOnChanges();
    });
  }

}
