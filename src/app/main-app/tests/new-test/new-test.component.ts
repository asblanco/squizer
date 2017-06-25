import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';

import { Course } from '../../db/course';
import { CourseService } from '../../db/course.service';
import { Test } from '../../db/test';
import { TestService } from '../../db/test.service';
import { TestsSideNavService } from '../../navbars/tests-sidenav/tests-sidenav.service';

import { APP_CONFIG } from '../../../shared/app-config/app-config';
import { IAppConfig } from '../../../shared/app-config/iapp-config';

import { CustomValidators } from 'ng2-validation';
import { MaterializeDirective } from 'angular2-materialize';
import { I18nService } from '../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
  termId: number;
  courses: Course[] = [];
  tests: Test[] = [];
  selectedCourse: Course = null; // Course with checked property in questions and answers
  newTestForm: FormGroup;
  maxLengthTest: number;
  selectedChapter = null;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private courseService: CourseService,
    private i18nService: I18nService,
    private router: Router,
    private testService: TestService,
    private testsSideNavService: TestsSideNavService
  ) {
    this.maxLengthTest = config.MAXLENGTH_TEST;

    this.courseService.getCourses()
    .then(courses => { this.courses = courses; })
    .catch(() => this.i18nService.error(9, ''));

    this.newTestForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthTest)]],
      course: 0,
      term: 0,
      bannedTests: [],
      chapters: this.fb.array([])
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
       this.termId = params['termId'];
     });
  }

  getTotalNumberQuestions() {
    let sum = 0;
    this.chapters.controls.forEach(c => {
      sum += c.value.numberQuestions;
    });
    return sum;
  }

  /*
  * Array getters of newTestForm
  */

  get chapters(): FormArray {
    return this.newTestForm.get('chapters') as FormArray;
  };

  getQuestions(i: number): FormArray {
    return this.chapters.controls[i].get('questions') as FormArray;
  }

  getAnswers(i: number, j: number): FormArray {
    return this.getQuestions(i).controls[j].get('answers') as FormArray;
  }

  // Used to know which chapter to show in the card
  selectChapter(chapter) {
    this.selectedChapter = chapter;
  }

  /*
  * Checkboxes
  */

  checkAll(divId: string, check: boolean) {
    $('#' + divId + ' :checkbox:enabled').prop('checked', check);

    this.chapters.controls.forEach( (c, i) => {
      c.value.checked = check;
      this.getQuestions(i).controls.forEach( (q, j) => {
        q.value.checked = check;
        this.getAnswers(i, j).controls.forEach(a => a.value.checked = check);
      });
    });
  }

  checkChapter(check: boolean, chapter, i) {
    $('#ch' + chapter.id + ' :checkbox:enabled').prop('checked', check);
    this.getQuestions(i).controls.forEach( (q, j) => {
      q.value.checked = check;
      this.getAnswers(i, j).controls.forEach(a => a.value.checked = check);
    });
  }

  checkQuestion(check: boolean, questionId, chapterIndex, questionIndex) {
    $('#q' + questionId + ' :checkbox:enabled').prop('checked', check);
    this.getAnswers(chapterIndex, questionIndex).controls.forEach(a => a.value.checked = check);
  }

  // If I use formControlName in the template, it also unchecks the question
  checkAnswer(check: boolean, chapterIndex, questionIndex, answerIndex) {
    this.getAnswers(chapterIndex, questionIndex).controls[answerIndex].value.checked = check;
  }

  banQuestions() {
    const bannedQuestions = [];
    // Fill list bannedQuestions
    this.newTestForm.value.bannedTests.forEach( t => {
      t.questions.forEach(q => {
        bannedQuestions.push(q);
      });
    });
    // Deselect checboxes and the form
    this.selectedCourse.chapters.forEach((c, i) => {
      c.questions.forEach((q, j) => {
        if (bannedQuestions.includes(q.id)) {
          $('#q' + q.id + ' :checkbox:enabled').prop('checked', false);
          this.getQuestions(i).controls[j].value.checked = false;
        }
      });
    });
  }

  /*
  * Select a course, download its data and initialize the reactive form
  */

  selectCourse() {
    this.courseService.getCourseDetails(this.newTestForm.value.course)
    .then(course => {
      this.selectedCourse = course;
      if (course.chapters.length > 0) {
        this.selectedChapter = course.chapters[0];
        // Download past tests
        this.testService.getCourseTests(course.id)
        .then((tests) => {
          this.tests = tests;
        })
        .catch(() => this.i18nService.error(13, ''));
      }
      this.setForm();
    })
    .catch(() => this.i18nService.error(10, ''));
  }

  setForm() {
    const title = this.newTestForm.value.title;
    this.newTestForm = this.fb.group({
      title: [title, [Validators.required, Validators.maxLength(this.maxLengthTest)]],
      course: [this.selectedCourse.id, [Validators.required]],
      term: this.termId,
      bannedTests: [],
      chapters: this.fb.array([]),
    });
    this.setChapters();
  }

  setChapters() {
    const chapters = this.selectedCourse.chapters;
    let c;
    for (let i = 0; i < chapters.length; i++) {
      c = this.fb.group({
            id: chapters[i].id,
            title: chapters[i].title,
            numberQuestions: [0, [CustomValidators.min(0), CustomValidators.max(chapters[i].questions.length)]],
            questions: this.fb.array([])
          });
      this.setQuestions(c.controls, chapters[i], i);
      this.chapters.push(c);
    }
  }

  setQuestions(c, chapter, i) {
    const questions = chapter.questions;
    let q;
    for (let j = 0; j < questions.length; j++) {
      q = this.fb.group({
            id: questions[j].id,
            chapter: questions[j].chapter,
            title: questions[j].title,
            checked: false,
            answers: this.fb.array([])
          });
      this.setAnswers(q.controls, questions[j], i, j);
      c.questions.push(q);
    }
  }

  setAnswers(q, question, i, j) {
    const answers = question.answers;
    for (let k = 0; k < answers.length; k++) {
      q.answers.push(
        this.fb.group({
          id: answers[k].id,
          question: question.id,
          title: answers[k].title,
          correct: answers[k].correct,
          checked: false
        })
      );
    }
  }

  onSubmit() {
    if (this.getTotalNumberQuestions() <= 0) {
      this.i18nService.info(0);
    } else {
      this.testService.generateTest(this.newTestForm.value)
      .then(generatedTest => {
        // Save to database
        this.testService.create(generatedTest)
        .then(test => {
          this.router.navigate(['../test/' + test.id], {relativeTo: this.activatedRoute});
        })
        .catch(() => this.i18nService.error(11, ''));
      })
      .catch((err) => {
        switch (err._body) {
           case '1':
              this.i18nService.info(1);
              break;
           case '2':
              this.i18nService.info(2);
              break;
           default:
              this.i18nService.info(3);
              break;
        }
      });
    }
  }
}
