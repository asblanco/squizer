import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Call } from '../../../db/call';
import { CallService } from '../../../db/call.service';
import { SchoolYear } from '../../../db/school-year';
import { SchoolYearService } from '../../../db/school-year.service';
import { TestsSideNavService } from '../../tests-side-nav/tests-side-nav.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-school-year-call',
  templateUrl: './edit-school-year-call.component.html',
  styleUrls: ['./edit-school-year-call.component.css']
})
export class EditSchoolYearCallComponent implements OnChanges {
  @Input() call: Call;
  @Input() schoolYear: SchoolYear;
  @Input() modalId: string;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private callService: CallService,
    private schoolYearService: SchoolYearService,
    private testsSideNavService: TestsSideNavService,
    private notificationsService: NotificationsService
  ) {
    this.createForm();
  }

  openDeleteSchoolYearModal() {
    (<any>$('#deleteSchoolYearModal' + this.schoolYear.id)).openModal();
  }

  ngOnChanges() {
    this.setForm();
  }

  createForm() {
    if (this.schoolYear != null) {
      this.editForm = this.fb.group({
        id: 0,
        title: ['', [Validators.required, Validators.minLength(5)]],
        start_date: [new Date(), [Validators.required]],
        end_date: [new Date(), [Validators.required]],
        calls: this.fb.array([])
      });
    } else {
      this.editForm = this.fb.group({
        id: 0,
        school_year: 0,
        title: ['', [Validators.required, Validators.minLength(5)]],
        start_date: [new Date(), [Validators.required]],
        end_date: [new Date(), [Validators.required]]
      });
    }
  }

  setForm() {
    if (this.schoolYear != null) {
      const callFGs = this.schoolYear.calls.map(call => this.fb.group(call));
      const callFormArray = this.fb.array(callFGs);
      this.editForm.reset({
        id: this.schoolYear.id,
        title: this.schoolYear.title,
        start_date: <Date>(this.schoolYear.start_date),
        end_date: <Date>(this.schoolYear.end_date)
      });
      this.editForm.setControl('calls', callFormArray);
    } else {
      this.editForm.reset({
        id: this.call.id,
        school_year: this.call.school_year,
        title: this.call.title,
        start_date: <Date>(this.call.start_date),
        end_date: <Date>(this.call.end_date)
      });
    }
  }

  onSubmit() {
    if (this.schoolYear != null) {
      this.schoolYearService.update(this.editForm.value)
      .then(schoolYear => {
        this.testsSideNavService.announceEditSchoolYear(schoolYear);
      })
      .catch(() => this.notificationsService.error('Error', 'Al editar curso: ' + this.editForm.value.title));
    } else {
      this.callService.update(this.editForm.value)
      .then(call => {
        this.testsSideNavService.announceEditCall(call);
      })
      .catch(() => this.notificationsService.error('Error', 'Al editar convocatoria: ' + this.editForm.value.title));
    }
    this.ngOnChanges();
  }

}
