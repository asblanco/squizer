import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder }  from '@angular/forms';
import { Question } from '../../../shared/db/question';
import { QuestionService }    from '../../../shared/db/question.service';
import { CourseInfoService }  from '../../course-info.service';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  public myForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private courseInfoService: CourseInfoService,
    private questionService: QuestionService) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      answers: this._fb.array([])
    });
  }

  openEditQuestionModal() {
    (<any>$('#editQuestionModal'+this.question.id)).openModal({dismissible: false});
  }

  openDeleteQuestionModal() {
    (<any>$('#deleteQuestionModal'+this.question.id)).openModal();
  }

  deleteQuestion() {
    this.questionService
        .delete(this.question.id)
        .then(() => {
          this.courseInfoService.deleteQuestion(this.question.chapter, this.question);
        });
  }

  initAnswer() {
    return this._fb.group({
      answer: ['', Validators.required],
      correct: false
    });
  }

  addAnswer() {
    const control = <FormArray>this.myForm.controls['answers'];
    control.push(this.initAnswer());
  }

  removeAnswer(i: number) {
    const control = <FormArray>this.myForm.controls['answers'];
    control.removeAt(i);
  }

}
