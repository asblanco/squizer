import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { CallService } from '../../../db/call.service';
import { SchoolYear } from '../../../db/school-year';
import { TestsSideNavService } from '../../tests-side-nav/tests-side-nav.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.css']
})
export class NewCallComponent implements OnChanges {
  @Input() modalId: string;
  @Input() schoolYear: SchoolYear;
  newCallForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private callService: CallService,
    private testsSideNavService: TestsSideNavService,
    private notificationsService: NotificationsService
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
      this.testsSideNavService.addCall(call);
      this.testsSideNavService.announceSelected(this.schoolYear, call);
    })
    .catch(() => this.notificationsService.error('Error', 'Al crear convocatoria: ' + this.newCallForm.value.title));

    this.ngOnChanges();
  }

  // prepareSaveCall(): Call {
  //   const formModel = this.newCallForm.value;
  //
  //   // return new `Question` object containing a combination of original question value(s)
  //   // and deep copies of changed form model values
  //   const saveCall: Call = {
  //     school_year: this.schoolYear.id,
  //     title: formModel.title as string,
  //     start_date: formModel.start_date as Date,
  //     end_date: formModel.end_date as Date
  //   };
  //   return saveCall;
  // }


}
