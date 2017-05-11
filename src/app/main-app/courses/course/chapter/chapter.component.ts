import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { Chapter } from '../../../db/chapter';
import { Question } from '../../../db/question';
import { ChapterService } from '../../../db/chapter.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements AfterViewInit {
  @Input() chapter: Chapter;
  @Output() deletedChapter: EventEmitter<Chapter> = new EventEmitter();

  constructor(
    private chapterService: ChapterService,
    private notificationsService: NotificationsService ) { }

  ngAfterViewInit() {
    (<any>$('.collapsible')).collapsible();
  }

  openEditChapterModal() {
    (<any>$('#editChapterModal' + this.chapter.id)).openModal();
  }

  openNewQuestionModal() {
    (<any>$('#newQuestionModal' + this.chapter.id)).openModal({dismissible: false});
  }

  openDeleteChapterModal() {
    (<any>$('#deleteChapterModal' + this.chapter.id)).openModal();
  }

  updateChapterTitle(title: string): void {
    const oldTitle = this.chapter.title;
    this.chapter.title = title;
    this.chapterService.update(this.chapter)
    .then((chapter) => { this.chapter.title = chapter.title; })
    .catch(() => {
        this.chapter.title = oldTitle;
        this.notificationsService.error('Error', 'Al actualizar el titulo del tema.');
      });
  }

  deleteChapter() {
    this.chapterService
      .delete(this.chapter.id)
      .then(() => {
        this.deletedChapter.emit(this.chapter);
      })
      .catch( () => this.notificationsService.error('Error', 'Al eliminar el capitulo: ' + this.chapter.title));
  }

  deleteQuestion(question) {
    this.chapter.questions.splice(this.chapter.questions.indexOf(question), 1);
  }

}
