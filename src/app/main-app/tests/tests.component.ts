import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TestsService } from './tests.service';

@Component({
  selector: 'app-tests',
  templateUrl: 'tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  selectedSchoolYearId$: Observable<number>;

  constructor( private testsService: TestsService ) {
    this.selectedSchoolYearId$ = testsService.selectedSchoolYear$;
  }

  ngOnInit() {}
}
