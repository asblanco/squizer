import { Component, Input, OnChanges, AfterViewInit }                    from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder }  from '@angular/forms';

import { Chapter }   from '../../../../shared/db/chapter';
import { Question }  from '../../../../shared/db/question';
import { Answer }    from '../../../../shared/db/answer';

import { QuestionService }    from '../../../../shared/db/question.service';
import { AnswerService }      from '../../../../shared/db/answer.service';
import { CourseInfoService }  from '../../../course-info.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
  moduleId: module.id,
  selector: 'edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.css']
})
export class EditQuestionModalComponent implements OnChanges, AfterViewInit {
  @Input() chapterId: number;
  @Input() question: Question;
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseInfoService: CourseInfoService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private notificationsService: NotificationsService )
  {
    this.createForm();
  }

  ngOnChanges() {
    this.questionForm.reset({
      title: this.question.title
    });
    this.setAnswers(this.question.answers);
  }

  ngAfterViewInit() {
  }

  createForm() {
    this.questionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      answers: this.fb.array([])
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
    //$( "#answer"+i ).remove();
  }

  onSubmit() {
    const q = this.prepareSaveQuestion();
    const answers = this.answers.value;
    const noInserts = this.updateQuestionWithoutInserts(q);

    /* Update and delete answers */
    this.questionService.update(q)
      .then(question => {
        this.courseInfoService.updateQuestion(this.question.chapter, noInserts);
        this.question = noInserts;

        /* Create the new ones */
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].id == 0){
              this.answerService.create(answers[i])
                .then(answer => {
                  this.question = this.courseInfoService.addAnswer(this.question.chapter, this.question, answer);
                })
                .catch(() => this.notificationsService.error("Error", "Al crear las nuevas respuestas."));
            }
        }
      })
      .catch(() => this.notificationsService.error("Error", "Al actualizar la pregunta: " + q.title));

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
      id: this.question.id,
      chapter: this.chapterId,
      title: formModel.title as string,
      answers: answersDeepCopy
    };
    return saveQuestion;
  }

  updateQuestionWithoutInserts(completeQuestion: Question): Question {
    let answersDeepCopy: Answer[] = new Array<Answer>();
    for(var i = 0; i < completeQuestion.answers.length; i++){
      if(completeQuestion.answers[i].id != 0)
        answersDeepCopy.push(completeQuestion.answers[i]);
    }

    const updateQ: Question = {
      id: completeQuestion.id,
      chapter: completeQuestion.chapter,
      title: completeQuestion.title,
      answers: answersDeepCopy
    };
    return updateQ;
  }

  revert() { this.ngOnChanges(); }
}