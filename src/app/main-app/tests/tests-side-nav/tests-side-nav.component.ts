import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router, RouterModule, NavigationEnd } from '@angular/router';

import { Call } from '../../db/call';
import { SchoolYear } from '../../db/school-year';
import { SchoolYearService } from '../../db/school-year.service';
import { TestsService } from '../tests.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tests-side-nav',
  templateUrl: './tests-side-nav.component.html',
  styleUrls: ['./tests-side-nav.component.css']
})
export class TestsSideNavComponent implements OnInit {
  schoolYears$: Observable<SchoolYear[]>;
  selectedCallId$: Observable<number>;
  selectedSchoolYearId$: Observable<number>;

  constructor(
    // private activatedRoute: ActivatedRoute,
    // private router: Router,
    private testsService: TestsService
  ) {
    // For now the side nav cannot access the activatedRoute because angular
    // only gives it to the active component
    // this.router.events
    // .filter(event => event instanceof NavigationEnd)
    // .takeUntil(this.ngUnsubscribe)
    // .subscribe((event: NavigationEnd) => {
    //   let trigger = event.urlAfterRedirects;
    //   let regexpSchoolYear = new RegExp('/manage-tests/school-year/[1-9]+');
    //   let regexpCall = new RegExp('/manage-tests/school-year/[0-9]+/call/[0-9]+');
    //
    //   if (event.urlAfterRedirects === '/manage-tests') {
    //   } else if (regexpSchoolYear.test(trigger)) {
    //   } else if (regexpCall.test(trigger)) {
    //   }
    // });

    this.schoolYears$ = testsService.getSchoolYears$;
    this.selectedSchoolYearId$ = testsService.selectedSchoolYear$;
    this.selectedCallId$ = testsService.selectedCall$;
  }

  ngOnInit() {
  }

  openSchoolYearModal() {
    (<any>$('#newSchoolYearModal')).openModal();
  }

  openNewCallModal(schoolYear: SchoolYear) {
    (<any>$('#newCallModal' + schoolYear.id)).appendTo("body").openModal();
  }

}
