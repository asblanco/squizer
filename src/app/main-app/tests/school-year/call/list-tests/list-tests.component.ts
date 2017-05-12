import { Component, Input, OnChanges } from '@angular/core';
import { Test } from '../../../../db/test';
import { TestService } from '../../../../db/test.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-list-tests',
  templateUrl: './list-tests.component.html',
  styleUrls: ['./list-tests.component.css']
})
export class ListTestsComponent implements OnChanges {
  @Input() schoolYearId: number;
  @Input() callId: number;
  @Input() courseId: number;
  tests: Test[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private testService: TestService
  ) { }

  ngOnChanges() {
    this.getTests();
  }

  openDeleteTestModal(id) {
    (<any>$('#deleteTestModal' + id)).appendTo('body').openModal();
  }

  getTests() {
    this.testService.getCourseCallTests(this.callId, this.courseId)
    .then((tests) => {
      this.tests = tests;
    })
    .catch(() => this.notificationsService.error('Error', 'Al descargar tests.'));
  }

  deleteTest(test: Test) {
    this.testService
    .delete(test.id)
    .then(() => {
      this.tests.splice(this.tests.indexOf(test), 1);
    })
    .catch(() => this.notificationsService.error('Error', 'Al eliminar convocatoria ' + test.title));
  }

  displayPDF(id: number) {
    this.testService.downloadPDF(id).subscribe(
        (res) => {
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        }
    );
  }

  downloadTEX(id: number) {
    this.testService.downloadTEX(id).subscribe(
        (res) => {
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        }
    );
  }

}
