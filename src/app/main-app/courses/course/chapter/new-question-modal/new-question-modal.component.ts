import { Component, Input, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Chapter } from '../../../../db/chapter';
import { Question } from '../../../../db/question';
import { Answer } from '../../../../db/answer';

import { QuestionService } from '../../../../db/question.service';
import { CourseInfoService } from '../../../course-info.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-question-modal',
  templateUrl: './new-question-modal.component.html',
  styleUrls: ['./new-question-modal.component.css']
})
export class NewQuestionModalComponent implements OnChanges {
  @Input() chapter: Chapter;
  question: Question = new Question();
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseInfoService: CourseInfoService,
    private questionService: QuestionService,
    private notificationsService: NotificationsService ) {
      this.createForm();
  }

  ngOnChanges() {
    this.createForm();
  }

  createForm() {
    this.questionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      answers: this.fb.array([
        this.initAnswerT(),
        this.initAnswerF(),
        this.initAnswerF(),
        this.initAnswerF()
      ])
    });
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  };

  setAnswers(answers: Answer[]) {
    const answerFGs = answers.map(answer => this.fb.group(answer));
    const answerFormArray = this.fb.array(answerFGs);
    this.questionForm.setControl('answers', answerFormArray);
  }

  /* Answer */
  initAnswerT() {
    return this.fb.group({
      title: ['', Validators.required],
      correct: true
    });
  }

  initAnswerF() {
    return this.fb.group({
      title: ['', Validators.required],
      correct: false
    });
  }

  addAnswer() {
    const control = <FormArray>this.questionForm.controls['answers'];
    control.push(this.initAnswerF());
  }

  removeAnswer(i: number) {
    const control = <FormArray>this.questionForm.controls['answers'];
    control.removeAt(i);
  }

  onSubmit() {
    this.question = this.prepareSaveQuestion();

    this.questionService.create(this.question)
      .then(question => {
        this.courseInfoService.addQuestion(question.chapter, question);
      })
      .catch(() => this.notificationsService.error('Error', 'Al crear pregunta: ' + this.question.title));
    this.ngOnChanges();
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
      id: 0,
      chapter: this.chapter.id,
      title: formModel.title as string,
      last_modified: new Date,
      answers: answersDeepCopy
    };
    return saveQuestion;
  }

  revert() { this.ngOnChanges(); }

}
