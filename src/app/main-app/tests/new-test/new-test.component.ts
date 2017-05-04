import { AfterViewInit, Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { Course } from '../../db/course';
import { CourseService } from '../../db/course.service';
import { Test } from '../../db/test';
import { TestService } from '../../db/test.service';
import { TestsSideNavService } from '../tests-side-nav/tests-side-nav.service';

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

interface Dictionary {
  [ index: number ]: boolean
}

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements AfterViewInit, OnChanges, OnInit, OnDestroy {
  callId: number;
  courses: Course[] = [];
  course = null; // Course with checked property in questions and answers
  test: Test;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private notificationsService: NotificationsService,
    private testService: TestService,
    private testsSideNavService: TestsSideNavService
  ) {
    this.testsSideNavService.getCourses$
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      courses => {
        this.courses = courses;
    });
  }

  ngOnInit() {
    // this.courses = this.testsSideNavService.courses;
    this.activatedRoute.params.subscribe((params: Params) => {
       this.callId = params['callId'];
     });

    this.test = {
     id: 0,
     title: '',
     course: 0,
     call: this.callId,
     creation_date: new Date,
     questions: [],
     answers: []
    }
  }

  ngAfterViewInit() {
    // (<any>$('select')).material_select();
    // $('#selectCourse').on('change', function(){
    //   console.log("got you");
    // });
  }

  ngOnChanges() {
  }

  checkAll(divId: string, check: boolean) {
    $('#' + divId + ' :checkbox:enabled').prop('checked', check);
    for (let i = 0; i < this.course.chapters.length; i++) {
      let qs = this.course.chapters[i].questions;
      for (let j = 0; j < qs.length; j++) {
        let q = this.course.chapters[i].questions[j];
        q.checked = check;
        for (let k = 0; k < q.answers.length; k++) {
          let a = q.answers[k];
          a.checked = check;
        }
      }
    }
  }

  selectCourse() {
    this.test.questions = [];
    this.test.answers = [];
    this.courseService.getCourseDetails(this.test.course)
    .then(course => {
      this.setArray(course);
    })
    .catch(() => this.notificationsService.error('Error', 'Al descargar los datos de la asignatura.'));
  }

  setArray(c) {
    this.course = JSON.parse(JSON.stringify(c)); // Save value without binding
    for (let i = 0; i < c.chapters.length; i++) {
      let qs = c.chapters[i].questions;
      this.course.chapters[i] = {
        id: c.chapters[i].id,
        course: c.chapters[i].course,
        title: c.chapters[i].title,
        questions: c.chapters[i].questions,
        nQuestions: 0
      }
      for (let j = 0; j < qs.length; j++) {
        let q = qs[j];
        this.course.chapters[i].questions[j] = {
          id: q.id,
          chapter: q.chapter,
          title: q.title,
          answers: q.answers,
          checked: false
        }
        for (let k = 0; k < q.answers.length; k++) {
          let a = q.answers[k];
          this.course.chapters[i].questions[j].answers[k] = {
            id: a.id,
            question: a.question,
            title: a.title,
            correct: a.correct,
            checked: false
          }
        }
      }
    }
  }

  saveQuestions() {
    for (let i = 0; i < this.course.chapters.length; i++) {
      let qs = this.course.chapters[i].questions;
      for (let j = 0; j < qs.length; j++) {
        let q = this.course.chapters[i].questions[j];
        if (q.checked) {
          this.test.questions.push(q.id);

          for (let k = 0; k < q.answers.length; k++) {
            let a = q.answers[k];
            if (a.checked){
              this.test.answers.push(a.id);
            }
          }
        }
      }
    }
  }

  generateTest() {
    for (let i = 0; i < this.course.chapters.length; i++) {
      let qs = this.course.chapters[i].questions;
      let questions = [];
      let answers = [];
      if (this.course.chapters[i].nQuestions > 0) {
        for (let j = 0; j < qs.length; j++) {
          let q = this.course.chapters[i].questions[j];
          if (q.checked) {
            questions.push(q.id);

            for (let k = 0; k < q.answers.length; k++) {
              let a = q.answers[k];
              if (a.checked){
                answers.push(a.id);
              }
            }
          }
        }
        for (let x = 0; x < this.course.chapters[i].nQuestions; x++) {
          let max = questions.length;
          let n = Math.floor(Math.random() * max) + 1 ;
          this.test.questions.push(questions[n-1]);
          questions.splice(n-1, 1);
          for (let y = 0; y < 4; y++) {
            let maxA = answers.length;
            let nA = Math.floor(Math.random() * maxA) + 1 ;
            this.test.answers.push(answers[nA-1]);
            answers.splice(nA-1, 1);
          }
        }
      }
    }


  }

  save(form: Test) {
    // const v = (<any>$('#selectCourse')).val();
    // this.test.course = v;
    // this.saveQuestions();
    this.generateTest();
    console.log(this.test);
    this.testService.create(this.test)
    .then(test => {
      console.log(test);
    })
    .catch(() => this.notificationsService.error('Error', 'Al crear test: ' + this.test.title));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
