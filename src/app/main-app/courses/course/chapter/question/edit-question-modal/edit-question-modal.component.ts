import { Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Answer } from '../../../../../db/answer';
import { Chapter } from '../../../../../db/chapter';
import { Question } from '../../../../../db/question';

import { AnswerService } from '../../../../../db/answer.service';
import { QuestionService } from '../../../../../db/question.service';
import { APP_CONFIG } from '../../../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../../../shared/app-config/iapp-config';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { I18nService } from '../../../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.css']
})
export class EditQuestionModalComponent implements OnChanges {
  @Input() question: Question;
  @Input() editQuestionModal = new EventEmitter<string|MaterializeAction>();
  @Output() editedQuestion: EventEmitter<Question> = new EventEmitter();
  questionForm: FormGroup;
  maxLengthQuestion: number;
  maxLengthAnswer: number;

  constructor(
    private answerService: AnswerService,
    @Inject(APP_CONFIG) private config: IAppConfig,
    private fb: FormBuilder,
    private i18nService: I18nService,
    private questionService: QuestionService
  ) {
    this.maxLengthQuestion = config.MAXLENGTH_QUESTION;
    this.maxLengthAnswer = config.MAXLENGTH_ANSWER;

    this.questionForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthQuestion)]],
      answers: this.fb.array([])
    });
  }

  ngOnChanges() {
    this.questionForm.reset();
    this.initForm();
  }

  initForm() {
    this.questionForm = this.fb.group({
      id: this.question.id,
      chapter: this.question.chapter,
      title: [this.question.title, [Validators.required, Validators.maxLength(this.maxLengthQuestion)]],
      answers: this.fb.array([])
    });
    this.setAnswers(this.question.answers);
  }

  /*
  * Answers
  */
  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  setAnswers(answers: Answer[]) {
    const answerFGs = this.question.answers.map(answer =>
      this.fb.group({
        id: answer.id,
        question: answer.question,
        title: [answer.title, [Validators.required, Validators.maxLength(this.maxLengthAnswer)]],
        correct: answer.correct
      })
    );
    const answerFormArray = this.fb.array(answerFGs);
    this.questionForm.setControl('answers', answerFormArray);
  }

  initAnswer() {
    return this.fb.group({
      id: 0,
      question: this.question.id,
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthAnswer)]],
      correct: false
    });
  }

  addAnswer() {
    this.answers.push(this.initAnswer());
  }

  removeAnswer(i: number) {
    this.answers.removeAt(i);
  }

  onSubmit() {
    // Check if it creates at least 1 answer correct and 3 incorrects
    const question = this.questionForm.value;
    let corrects = 0;
    let incorrects = 0;
    for (let i = 0; i < question.answers.length; i++) {
      if (question.answers[i].correct) {
        corrects++;
      } else {
        incorrects++;
      }
    }

    if (corrects >= 1 && incorrects >= 3) {
      this.questionService.update(question)
        .then(q => {
          this.editedQuestion.emit(q);
          this.ngOnChanges();
        })
        .catch(() => {
          this.i18nService.error(24, question.title);
          this.ngOnChanges();
        });
    } else {
      this.i18nService.info(4);
    }
  }

  revert() { this.ngOnChanges(); }
}
