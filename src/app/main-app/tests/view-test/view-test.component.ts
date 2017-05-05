import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ViewTest } from '../../db/view-test';

import { TestService } from '../../db/test.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit {
  test: ViewTest;

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

}
