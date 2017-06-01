import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { TestDetail } from '../../../../../db/test-detail';

import { TestService } from '../../../../../db/test.service';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {
  test: TestDetail;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
       this.getTest(params['id']);
     });
  }

  getTest(id: number) {
    this.testService.getTest(id)
    .then(test => {
      this.test = test;
    })
    .catch(() => this.notificationsService.error('Error', 'Al descargar test.'));
  }

  displayPDF() {
    this.testService.downloadPDF(this.test.id).subscribe(
        (res) => {
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        }
    );
  }

  downloadTEX() {
    this.testService.downloadTEX(this.test.id).subscribe(
        (res) => {
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        }
    );
  }

}
