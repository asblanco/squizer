import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { SchoolYear } from '../../../db/school-year';
import { SchoolYearService } from '../../../db/school-year.service';
import { TestsService } from '../../tests.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-school-year',
  templateUrl: './edit-school-year.component.html',
  styleUrls: ['./edit-school-year.component.css']
})
export class EditSchoolYearComponent implements OnChanges {
  @Input() schoolYear: SchoolYear;
  editSchoolYearForm: FormGroup;
  @Output() editedSchoolYear: EventEmitter<SchoolYear> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private schoolYearService: SchoolYearService,
    private testsService: TestsService,
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
    this.editSchoolYearForm = this.fb.group({
      id: 0,
      title: ['', [Validators.required, Validators.minLength(5)]],
      start_date: [new Date(), [Validators.required]],
      end_date: [new Date(), [Validators.required]],
      calls: this.fb.array([])
    });
  }

  setForm() {
    this.editSchoolYearForm.reset({
      id: this.schoolYear.id,
      title: this.schoolYear.title,
      start_date: <Date>(this.schoolYear.start_date),
      end_date: <Date>(this.schoolYear.end_date)
    });
  }

  onSubmit() {
    // Set calls array here because the form could have been initialized before
    // the user modified the calls array, so in this form the array is not updated
    const callFGs = this.schoolYear.calls.map(call => this.fb.group(call));
    const callFormArray = this.fb.array(callFGs);
    this.editSchoolYearForm.setControl('calls', callFormArray);

    this.schoolYearService.update(this.editSchoolYearForm.value)
    .then(schoolYear => {
      this.editedSchoolYear.emit(schoolYear);
      this.testsService.updateSchoolYear(schoolYear);
    })
    .catch(() => this.notificationsService.error('Error', 'Al editar curso: ' + this.editSchoolYearForm.value.title));

    this.ngOnChanges();
  }

}
