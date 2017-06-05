import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { TestDetail } from '../../../../../db/test-detail';

import { TestService } from '../../../../../db/test.service';
import { I18nService } from '../../../../../../shared/i18n/i18n.service';
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
    private i18nService: I18nService,
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
    .catch(() => this.i18nService.error(14, ''));
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
