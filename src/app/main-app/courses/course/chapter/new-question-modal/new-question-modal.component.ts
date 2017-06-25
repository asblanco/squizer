import { Component, EventEmitter, Inject, Input } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Chapter } from '../../../../db/chapter';
import { Question } from '../../../../db/question';
import { Answer } from '../../../../db/answer';
import { QuestionService } from '../../../../db/question.service';
import { APP_CONFIG } from '../../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../../shared/app-config/iapp-config';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { I18nService } from '../../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-new-question-modal',
  templateUrl: './new-question-modal.component.html',
  styleUrls: ['./new-question-modal.component.css']
})
export class NewQuestionModalComponent {
  @Input() chapter: Chapter;
  newQuestionModal = new EventEmitter<string|MaterializeAction>();
  newQuestion: FormGroup;
  maxLengthQuestion: number;
  maxLengthAnswer: number;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private fb: FormBuilder,
    private questionService: QuestionService,
    private i18nService: I18nService ) {
      this.maxLengthQuestion = config.MAXLENGTH_QUESTION;
      this.maxLengthAnswer = config.MAXLENGTH_ANSWER;
      this.createForm();
  }

  openNewQuestionModal() {
    this.newQuestionModal.emit({action: 'modal', params: ['open']});
  }

  createForm() {
    this.newQuestion = this.fb.group({
      id: 0,
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthQuestion)]],
      chapter: 0,
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
      id: 0,
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
    /*
    * Check if it creates at least 1 answer correct and 3 incorrects
    */
    const newQuestion = this.newQuestion.value;
    let corrects = 0;
    let incorrects = 0;
    for (let i = 0; i < newQuestion.answers.length; i++) {
      if (newQuestion.answers[i].correct) {
        corrects++;
      } else {
        incorrects++;
      }
    }

    if (corrects >= 1 && incorrects >= 3) {
      newQuestion.chapter = this.chapter.id;

      this.questionService.create(newQuestion)
      .then(question => {
          this.chapter.questions.push(question);
          this.createForm();
        })
      .catch(() => this.i18nService.error(22, newQuestion.title));
    } else {
      this.i18nService.info(4);
    }
  }

  revert() { this.createForm(); }
}
