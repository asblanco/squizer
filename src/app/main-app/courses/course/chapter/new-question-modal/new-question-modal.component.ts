import { Component, EventEmitter, Inject, Input, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Chapter } from '../../../../db/chapter';
import { Question } from '../../../../db/question';
import { Answer } from '../../../../db/answer';
import { QuestionService } from '../../../../db/question.service';
import { APP_CONFIG } from '../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../shared/app-config/iapp-config';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-question-modal',
  templateUrl: './new-question-modal.component.html',
  styleUrls: ['./new-question-modal.component.css']
})
export class NewQuestionModalComponent implements OnChanges {
  @Input() chapter: Chapter;
  newQuestionModal = new EventEmitter<string|MaterializeAction>();
  newQuestion: FormGroup;
  maxLengthQuestion: number;
  maxLengthAnswer: number;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private fb: FormBuilder,
    private questionService: QuestionService,
    private notificationsService: NotificationsService ) {
      this.maxLengthQuestion = config.MAXLENGTH_QUESTION;
      this.maxLengthAnswer = config.MAXLENGTH_ANSWER;

      this.newQuestion = this.fb.group({
        title: [''],
        chapter: 0,
        answers: this.fb.array([])
      });
  }

  ngOnChanges() {
    this.newQuestion.reset();
    this.createForm();
  }

  openNewQuestionModal() {
    this.newQuestionModal.emit({action:"modal",params:['open']});
  }

  createForm() {
    this.newQuestion = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthQuestion)]],
      chapter: this.chapter.id,
      answers: this.fb.array([
        this.initAnswer(true),
        this.initAnswer(false),
        this.initAnswer(false),
        this.initAnswer(false)
      ])
    });
  }

  /*
  * Answers
  */
  get answers(): FormArray {
    return this.newQuestion.get('answers') as FormArray;
  };

  initAnswer(c: boolean) {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthAnswer)]],
      correct: c
    });
  }

  addAnswer() {
    this.answers.push(this.initAnswer(false));
  }

  removeAnswer(i: number) {
    this.answers.removeAt(i);
  }

  onSubmit() {
    this.questionService.create(this.newQuestion.value)
    .then(question => {
        this.chapter.questions.push(question);
      })
      .catch(() => this.notificationsService.error('Error', 'Al crear pregunta: ' + this.newQuestion.value.title));
    this.ngOnChanges();
  }

  revert() { this.ngOnChanges(); }
}
