import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Call } from '../../../../db/call';
import { CallService } from '../../../../db/call.service';
import { TestsService } from '../../../tests.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-call',
  templateUrl: './edit-call.component.html',
  styleUrls: ['./edit-call.component.css']
})
export class EditCallComponent implements OnChanges {
  @Input() call: Call;
  editCallForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private callService: CallService,
    private testsService: TestsService,
    private notificationsService: NotificationsService
  ) {
    this.createForm();
  }

  ngOnChanges() {
    this.setForm();
  }

  createForm() {
    this.editCallForm = this.fb.group({
      id: 0,
      school_year: 0,
      title: ['', [Validators.required, Validators.minLength(5)]],
      start_date: [new Date(), [Validators.required]],
      end_date: [new Date(), [Validators.required]]
    });
  }

  setForm() {
    this.editCallForm.reset({
      id: this.call.id,
      school_year: this.call.school_year,
      title: this.call.title,
      start_date: <Date>(this.call.start_date),
      end_date: <Date>(this.call.end_date)
    });
  }

  onSubmit() {
    this.callService.update(this.editCallForm.value)
    .then(call => {
      this.call.title = call.title;
      this.call.start_date = call.start_date;
      this.call.end_date = call.end_date;
      this.testsService.updateCall(call);
      this.ngOnChanges();
    })
    .catch(() => {
      this.notificationsService.error('Error', 'Al editar convocatoria: ' + this.editCallForm.value.title);
      this.ngOnChanges();
    });
  }

}
