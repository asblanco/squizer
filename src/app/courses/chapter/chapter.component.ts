import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Chapter } from '../../shared/db/chapter';
import { Question } from '../../shared/db/question';

@Component({
  selector: 'chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, AfterViewInit {
  @Input() chapter: Chapter;
  selectedQuestion: Question;
  public myForm: FormGroup; // our form model

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      answers: this._fb.array([
        this.initAnswer(),
        this.initAnswer(),
        this.initAnswer(),
        this.initAnswer()
      ])
    });
    // add address
    //this.addAnswer();
  }

  ngAfterViewInit() {
    (<any>$('.collapsible')).collapsible(); //casting to any
  }

  openNewQuestionModal() {
    (<any>$('#newQuestionModal')).openModal({dismissible: false});
  }

  openEditQuestionModal(question: Question) {
    this.selectedQuestion = question;
    (<any>$('#editQuestionModal')).openModal();
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

  save(model: Question) {
      // call API to save question
      console.log(model);
  }

}
