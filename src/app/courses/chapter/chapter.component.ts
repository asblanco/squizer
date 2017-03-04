import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    (<any>$('.collapsible')).collapsible(); //casting to any
  }

  openNewQuestionModal() {
    (<any>$('#newQuestionModal')).openModal();
  }

  openEditQuestionModal(question: Question) {
    this.selectedQuestion = question;
    (<any>$('#editQuestionModal')).openModal();
  }

}
