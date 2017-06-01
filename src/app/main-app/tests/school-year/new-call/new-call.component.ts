import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CallService } from '../../../db/call.service';
import { SchoolYear } from '../../../db/school-year';
import { TestsSideNavService } from '../../tests-sidenav/tests-sidenav.service';
import { APP_CONFIG } from '../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../shared/app-config/iapp-config';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.css']
})
export class NewCallComponent implements OnChanges, AfterViewInit {
  @Input() schoolYear: SchoolYear;
  newCallModal = new EventEmitter<string|MaterializeAction>();
  newCallForm: FormGroup;
  maxLengthCall: number;

  constructor(
    private fb: FormBuilder,
    private callService: CallService,
    private notificationsService: NotificationsService,
    private router: Router,
    private testsSideNavService: TestsSideNavService,
    @Inject(APP_CONFIG) private config: IAppConfig,
  ) {
    this.maxLengthCall = config.MAXLENGTH_CALL;
    this.createForm();
  }

  ngOnChanges() {
    this.setForm();
  }

  ngAfterViewInit() {
    (<any>$('#newCallModal' + this.schoolYear.id)).appendTo('body');
  }


  openNewCallModal(schoolYear: SchoolYear) {
    this.newCallModal.emit({action:"modal",params:['open']});
  }

  createForm() {
    this.newCallForm = this.fb.group({
      school_year: -1,
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthCall)]],
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
      this.router.navigate(['/manage-tests/school-year/' + call.school_year + '/call/' + call.id]);
    })
    .catch(() => this.notificationsService.error('Error', 'Al crear convocatoria: ' + this.newCallForm.value.title));

    this.ngOnChanges();
  }

}
