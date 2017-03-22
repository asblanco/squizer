import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit }        from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder }  from '@angular/forms';

import { Chapter }  from '../../shared/db/chapter';
import { Question } from '../../shared/db/question';
import { ChapterService }     from '../../shared/db/chapter.service';

@Component({
  selector: 'chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, AfterViewInit {
  @Output() onDeletedChapter = new EventEmitter<Chapter>();
  @Input() chapter: Chapter;
  selectedQuestion: Question;
  public myForm: FormGroup; // our form model

  constructor(
    private _fb: FormBuilder,
    private chapterService: ChapterService) { }

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
    (<any>$('#editQuestionModal')).openModal({dismissible: false});
  }

  openDeleteChapterModal() {
    (<any>$('#deleteChapterModal'+this.chapter.id)).openModal();
  }

  /* Chapter delete and edit */
  deleteChapter(chapter: Chapter): void {
    this.chapterService
        .delete(chapter.id)
        .then(() => {
          this.onDeletedChapter.emit(chapter);
        });
  }

  /* Answer */
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
