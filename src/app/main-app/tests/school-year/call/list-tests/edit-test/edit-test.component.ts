import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';

import { Test } from '../../../../../db/test';
import { TestService } from '../../../../../db/test.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnChanges {
  @Input() test: Test;
  testForm: Test;

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private notificationsService: NotificationsService
  ) { }

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
