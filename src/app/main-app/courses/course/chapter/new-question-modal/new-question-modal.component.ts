import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Chapter } from '../../../../db/chapter';
import { Question } from '../../../../db/question';
import { Answer } from '../../../../db/answer';

import { QuestionService } from '../../../../db/question.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-question-modal',
  templateUrl: './new-question-modal.component.html',
  styleUrls: ['./new-question-modal.component.css']
})
export class NewQuestionModalComponent implements OnChanges {
  @Input() chapter: Chapter;
  newQuestion: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private notificationsService: NotificationsService ) {
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

  createForm() {
    this.newQuestion = this.fb.group({
      title: ['', [Validators.required]],
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

  setAnswers(answers: Answer[]) {
    // TODO add validators to answers title
    const answerFGs = answers.map(answer => this.fb.group(answer));
    const answerFormArray = this.fb.array(answerFGs);
    this.newQuestion.setControl('answers', answerFormArray);
  }

  initAnswer(c: boolean) {
    return this.fb.group({
      title: ['', Validators.required],
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
