import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { TermService } from '../../../db/term.service';
import { SchoolYear } from '../../../db/schoolyear';
import { TestsSideNavService } from '../../tests-sidenav/tests-sidenav.service';
import { APP_CONFIG } from '../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../shared/app-config/iapp-config';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { i18nService } from '../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-new-term',
  templateUrl: './new-term.component.html',
  styleUrls: ['./new-term.component.css']
})
export class NewTermComponent implements OnChanges, AfterViewInit {
  @Input() schoolYear: SchoolYear;
  newTermModal = new EventEmitter<string|MaterializeAction>();
  newTermForm: FormGroup;
  maxLengthTerm: number;

  constructor(
    private fb: FormBuilder,
    private termService: TermService,
    private i18nService: i18nService,
    private router: Router,
    private testsSideNavService: TestsSideNavService,
    @Inject(APP_CONFIG) private config: IAppConfig,
  ) {
    this.maxLengthTerm = config.MAXLENGTH_CALL;
    this.createForm();
  }

  ngOnChanges() {
    this.setForm();
  }

  ngAfterViewInit() {
    (<any>$('#newTermModal' + this.schoolYear.id)).appendTo('body');
  }


  openNewTermModal(schoolYear: SchoolYear) {
    this.newTermModal.emit({action: 'modal', params: ['open']});
  }

  createForm() {
    this.newTermForm = this.fb.group({
      schoolyear: -1,
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthTerm)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]]
    });
  }

  setForm() {
    this.newTermForm.reset({
      schoolyear: this.schoolYear.id,
      title: '',
      start_date: '',
      end_date: ''
    });
  }

  onSubmit() {
    this.termService.create(this.newTermForm.value)
    .then(term => {
      this.testsSideNavService.addTerm(term);
      this.router.navigate(['/manage-tests/schoolyear/' + term.schoolyear + '/term/' + term.id]);
    })
    .catch(() => this.i18nService.error(3, this.newTermForm.value.title));

    this.ngOnChanges();
  }

}
