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
import { NotificationsService } from 'angular2-notifications';

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
    private notificationsService: NotificationsService,
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
    // TODO add validators to answers title
    const answerFGs = this.question.answers.map(answer => this.fb.group(answer));
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

  /*
  * Submit
  */

  // TODO server should read question and its answers and update!! (remove, update and create as needed)
  onSubmit() {
    const noInserts = this.updateQuestionWithoutInserts(this.questionForm.value);
    const answers = this.answers.value;

    /* Update and delete answers and title question */
    this.questionService.update(noInserts)
      .then(question => {
        this.editedQuestion.emit(question);

        /* Create the new answers */
        for (let i = 0; i < answers.length; i++) {
          if (answers[i].id === 0) {
            this.answerService.create(answers[i])
              .then(answer => {
                noInserts.answers.push(answer);
                this.editedQuestion.emit(noInserts);
                this.ngOnChanges();
              })
              .catch(() => this.notificationsService.error('Error', 'Al crear las nuevas respuestas.'));
          }
        }
        this.ngOnChanges();
      })
      .catch(() => {
        this.notificationsService.error('Error', 'Al actualizar la pregunta: ' + noInserts.title);
        this.ngOnChanges();
      });
  }

  updateQuestionWithoutInserts(completeQuestion: Question): Question {
    const answersDeepCopy: Answer[] = new Array<Answer>();
    for (let i = 0; i < completeQuestion.answers.length; i++) {
      if (completeQuestion.answers[i].id !== 0) {
        answersDeepCopy.push(completeQuestion.answers[i]);
      }
    }

    const updateQ: Question = {
      id: completeQuestion.id,
      chapter: completeQuestion.chapter,
      title: completeQuestion.title,
      last_modified: new Date,
      answers: answersDeepCopy
    };
    return updateQ;
  }

  revert() { this.ngOnChanges(); }
}
