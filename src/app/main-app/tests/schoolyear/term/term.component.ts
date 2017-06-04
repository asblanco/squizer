import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Term } from '../../../db/term';
import { TermService } from '../../../db/term.service';
import { CourseService } from '../../../db/course.service';
import { Course } from '../../../db/course';
import { TestsSideNavService } from '../../tests-sidenav/tests-sidenav.service';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { i18nService } from '../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {
  termId: number;
  term: Term;
  courses: Course[];
  deleteTermModal = new EventEmitter<string|MaterializeAction>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private termService: TermService,
    private courseService: CourseService,
    private i18nService: i18nService,
    private router: Router,
    private testsSideNavService: TestsSideNavService
  ) {
    this.courseService.getCourses()
    .then(courses => { this.courses = courses; })
    .catch(() => this.i18nService.error(9, ''));
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
       this.termId = params['termId'];
       this.getTerm(this.termId);
     });
  }

  openDeleteTermModal() {
    this.deleteTermModal.emit({action: 'modal', params: ['open']});
  }

  getTerm(id: number) {
    this.termService.getTerm(id)
    .then(term => {
      this.term = term;
      this.testsSideNavService.announceSelected(term.schoolyear, term.id);
    })
    .catch(() => this.i18nService.error(7, ''));
  }

  deleteTerm() {
    this.termService
    .delete(this.term.id)
    .then(() => {
      this.testsSideNavService.deleteTerm(this.term);
      this.router.navigate(['/manage-tests/schoolyear/' + this.term.schoolyear]);
    })
    .catch(() => this.i18nService.error(8, this.term.title));
  }

}
