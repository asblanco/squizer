import { AfterViewInit, Component, Inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Course } from '../../../../db/course';
import { CourseService } from '../../../../db/course.service';
import { Test } from '../../../../db/test';
import { TestService } from '../../../../db/test.service';
import { TestsService } from '../../../tests.service';

import { APP_CONFIG } from '../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../shared/app-config/iapp-config'

import { MaterializeDirective } from "angular2-materialize";
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements AfterViewInit, OnChanges, OnInit {
  callId: number;
  courses: Course[] = [];
  course = null; // Course with checked property in questions and answers
  test: Test;
  maxLengthTest: number;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private notificationsService: NotificationsService,
    private router: Router,
    private testService: TestService,
    private testsService: TestsService
  ) {
    this.maxLengthTest = config.MAXLENGTH_TEST;

    this.courseService.getCourses()
    .then(courses => { this.courses = courses; })
    .catch(() => this.notificationsService.error('Error', 'Al descargar la lista de asignaturas.'));
  }

  ngOnInit() {
    // this.courses = this.testsService.courses;
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
    };
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
    let qs, q, a;
    for (let i = 0; i < this.course.chapters.length; i++) {
      qs = this.course.chapters[i].questions;
      for (let j = 0; j < qs.length; j++) {
        q = this.course.chapters[i].questions[j];
        q.checked = check;
        for (let k = 0; k < q.answers.length; k++) {
          a = q.answers[k];
          a.checked = check;
        }
      }
    }
  }

  checkChapter(check: boolean, chapter) {
    $('#ch' + chapter.id + ' :checkbox:enabled').prop('checked', check);
    const index = this.course.chapters.indexOf(chapter);
    const qs = this.course.chapters[index].questions;
    let q, a;
    for (let j = 0; j < qs.length; j++) {
      q = qs[j];
      q.checked = check;
      for (let k = 0; k < q.answers.length; k++) {
        a = q.answers[k];
        a.checked = check;
      }
    }
  }

  checkQuestion(check: boolean, question, chapter) {
    $('#q' + question.id + ' :checkbox:enabled').prop('checked', check);
    const chapterIndex = this.course.chapters.indexOf(chapter);
    const questionIndex = this.course.chapters[chapterIndex].questions.indexOf(question);
    const q = this.course.chapters[chapterIndex].questions[questionIndex];
    let a;
    for (let i = 0; i < q.answers.length; i++) {
      a = q.answers[i];
      a.checked = check;
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
    let qs, q, a;
    for (let i = 0; i < c.chapters.length; i++) {
      qs = c.chapters[i].questions;
      this.course.chapters[i] = {
        id: c.chapters[i].id,
        course: c.chapters[i].course,
        title: c.chapters[i].title,
        questions: c.chapters[i].questions,
        nQuestions: 0
      };
      for (let j = 0; j < qs.length; j++) {
        q = qs[j];
        this.course.chapters[i].questions[j] = {
          id: q.id,
          chapter: q.chapter,
          title: q.title,
          answers: q.answers,
          checked: false
        };
        for (let k = 0; k < q.answers.length; k++) {
          a = q.answers[k];
          this.course.chapters[i].questions[j].answers[k] = {
            id: a.id,
            question: a.question,
            title: a.title,
            correct: a.correct,
            checked: false
          };
        }
      }
    }
  }

  generateTest() {
    let qs;
    for (let i = 0; i < this.course.chapters.length; i++) {
      qs = this.course.chapters[i].questions;
      if (this.course.chapters[i].nQuestions > 0) {
        const questions: number[][] = [];
        // Fill in questions and answers arrays with all the checked ones
        let qi = 0, q;
        for (let j = 0; j < qs.length; j++) {
          q = this.course.chapters[i].questions[j];
          if (q.checked) {
            questions[qi] = [];
            questions[qi].push(q.id);
            let a;

            for (let k = 0; k < q.answers.length; k++) {
              a = q.answers[k];
              if (a.checked) {
                questions[qi].push(a.id);
              }
            }
            qi++;
          }
        }
        // Select them
        let max, n, maxA, nA;
        for (let x = 0; x < this.course.chapters[i].nQuestions; x++) {
          max = questions.length;
          n = Math.floor(Math.random() * max) + 1;
          this.test.questions.push(questions[n-1][0]);
          for (let y = 0; y < 4; y++) {
            maxA = questions[n-1].length - 1;
            nA = Math.floor(Math.random() * maxA) + 1;
            this.test.answers.push(questions[n-1][nA]);
            questions[n-1].splice(nA, 1);
          }
          questions.splice(n-1, 1);
        }
      }
    }
  }

  save() {
    this.generateTest();
    this.testService.create(this.test)
    .then(test => {
      this.router.navigate(['../test/' + test.id], {relativeTo: this.activatedRoute});
    })
    .catch(() => this.notificationsService.error('Error', 'Al crear test: ' + this.test.title));
  }

}
