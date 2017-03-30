import { Component, OnInit, Input, AfterViewInit }    from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder }  from '@angular/forms';

import { Chapter }  from '../../shared/db/chapter';
import { Question } from '../../shared/db/question';
import { ChapterService }     from '../../shared/db/chapter.service';
import { CourseInfoService }  from '../course-info.service';

@Component({
  selector: 'chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, AfterViewInit {
  @Input() chapter: Chapter;
  public myForm: FormGroup; // our form model

  constructor(
    private _fb: FormBuilder,
    private courseInfoService: CourseInfoService,
    private chapterService: ChapterService) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      answers: this._fb.array([
        this.initAnswerT(),
        this.initAnswerT(),
        this.initAnswerT(),
        this.initAnswerF()
      ])
    });
    // add address
    //this.addAnswer();
  }

  ngAfterViewInit() {
    (<any>$('.collapsible')).collapsible(); //casting to any
  }

  openEditChapterModal() {
    (<any>$('#editChapterModal'+this.chapter.id)).openModal();
  }

  openNewQuestionModal() {
    (<any>$('#newQuestionModal')).openModal({dismissible: false});
  }

  openDeleteChapterModal() {
    (<any>$('#deleteChapterModal'+this.chapter.id)).openModal();
  }

  /* Chapter delete and edit */
  updateChapterTitle(title: string): void {
    let oldTitle = this.chapter.title;
    this.chapter.title = title;
    this.chapterService.update(this.chapter)
    .then(() => { })
    .catch(() => this.chapter.title = oldTitle);
  }

  deleteChapter(chapter: Chapter): void {
    this.chapterService
        .delete(chapter.id)
        .then(() => {
          this.courseInfoService.deleteChapter(chapter);
        });
  }

  /* Answer */
  initAnswerT() {
    return this._fb.group({
      answer: ['', Validators.required],
      correct: true
    });
  }

  initAnswerF() {
    return this._fb.group({
      answer: ['', Validators.required],
      correct: false
    });
  }

  addAnswer() {
    const control = <FormArray>this.myForm.controls['answers'];
    control.push(this.initAnswerF());
  }

  removeAnswer(i: number) {
    const control = <FormArray>this.myForm.controls['answers'];
    control.removeAt(i);
  }

  addQuestion(q: Question) {
      // call API to save question
      console.log(q);
  }

}
