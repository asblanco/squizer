import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Answer } from '../../../../../db/answer';
import { Chapter } from '../../../../../db/chapter';
import { Question } from '../../../../../db/question';

import { AnswerService } from '../../../../../db/answer.service';
import { QuestionService } from '../../../../../db/question.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.css']
})
export class EditQuestionModalComponent implements OnChanges {
  @Input() question: Question;
  questionForm: FormGroup;

  constructor(
    private answerService: AnswerService,
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private questionService: QuestionService
  ) {
    this.questionForm = this.fb.group({
      title: ['', [Validators.required]],
      answers: this.fb.array([])
    });
  }

  ngOnChanges() {
    this.questionForm.reset();
    this.initForm();
  }

  initForm() {
    this.questionForm = this.fb.group({
      title: [this.question.title, [Validators.required]],
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
      title: ['', Validators.required],
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
    const q = this.prepareSaveQuestion();
    const answers = this.answers.value;
    const noInserts = this.updateQuestionWithoutInserts(q);

    /* Update and delete answers */
    this.questionService.update(q)
      .then(question => {
        this.question = noInserts;

        /* Create the new ones */
        for (let i = 0; i < answers.length; i++) {
          if (answers[i].id === 0) {
            this.answerService.create(answers[i])
              .then(answer => {
                this.question.answers.push(answer);
                this.ngOnChanges();
              })
              .catch(() => this.notificationsService.error('Error', 'Al crear las nuevas respuestas.'));
          }
        }
        this.ngOnChanges();
      })
      .catch(() => {
        this.notificationsService.error('Error', 'Al actualizar la pregunta: ' + q.title);
        this.ngOnChanges();
      });
  }

  prepareSaveQuestion(): Question {
    const formModel = this.questionForm.value;

    // deep copy of form model answers
    const answersDeepCopy: Answer[] = formModel.answers.map(
      (answer: Answer) => Object.assign({}, answer)
    );

    // return new `Question` object containing a combination of original question value(s)
    // and deep copies of changed form model values
    const saveQuestion: Question = {
      id: this.question.id,
      chapter: this.question.chapter,
      title: formModel.title as string,
      last_modified: new Date,
      answers: answersDeepCopy
    };
    return saveQuestion;
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
