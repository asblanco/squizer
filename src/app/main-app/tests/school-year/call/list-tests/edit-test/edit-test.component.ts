import { Component, EventEmitter, Inject, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';

import { Test } from '../../../../../db/test';
import { TestService } from '../../../../../db/test.service';

import { APP_CONFIG } from '../../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../../shared/app-config/iapp-config'

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnChanges {
  @Input() test: Test;
  testForm: Test;
  editTestModal = new EventEmitter<string|MaterializeAction>();
  maxLengthTest: number;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private fb: FormBuilder,
    private testService: TestService,
    private notificationsService: NotificationsService
  ) {
    this.maxLengthTest = config.MAXLENGTH_TEST;
  }

  ngOnChanges() {
    this.testForm = {
     id: this.test.id,
     title: this.test.title,
     course: this.test.course,
     call: this.test.call,
     creation_date: this.test.creation_date,
     questions: this.test.questions,
     answers: this.test.answers
   };
  }

  openEditTestModal(id) {
    this.editTestModal.emit({action:"modal",params:['open']});
  }

  updateTest() {
    this.testService.update(this.testForm)
    .then(test => {
      this.test.title = test.title;
      this.ngOnChanges();
    })
    .catch(() => {
      this.notificationsService.error('Error', 'Al actualizar test: ' + this.test.title);
      this.ngOnChanges();
    });
  }

}
