import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CallService } from '../../../db/call.service';
import { SchoolYear } from '../../../db/school-year';
import { TestsService } from '../../tests.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.css']
})
export class NewCallComponent implements OnChanges {
  @Input() schoolYear: SchoolYear;
  newCallForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private callService: CallService,
    private notificationsService: NotificationsService,
    private router: Router,
    private testsService: TestsService
  ) {
    this.createForm();
  }

  ngOnChanges() {
    this.setForm();
  }

  createForm() {
    this.newCallForm = this.fb.group({
      school_year: -1,
      title: ['', [Validators.required, Validators.maxLength(100)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]]
    });
  }

  setForm() {
    this.newCallForm.reset({
      school_year: this.schoolYear.id,
      title: '',
      start_date: '',
      end_date: ''
    });
  }

  onSubmit() {
    this.callService.create(this.newCallForm.value)
    .then(call => {
      this.testsService.addCall(call);
      this.router.navigate(['/manage-tests/school-year/' + call.school_year + '/call/' + call.id]);
    })
    .catch(() => this.notificationsService.error('Error', 'Al crear convocatoria: ' + this.newCallForm.value.title));

    this.ngOnChanges();
  }

}
