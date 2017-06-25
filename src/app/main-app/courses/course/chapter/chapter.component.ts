import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { APP_CONFIG } from '../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../shared/app-config/iapp-config';

import { Chapter } from '../../../db/chapter';
import { Question } from '../../../db/question';
import { ChapterService } from '../../../db/chapter.service';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { I18nService } from '../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent {
  @Input() chapter: Chapter;
  @Output() deletedChapter: EventEmitter<Chapter> = new EventEmitter();
  maxLengthChapter: number;
  editChapterModal = new EventEmitter<string|MaterializeAction>();
  deleteChapterModal = new EventEmitter<string|MaterializeAction>();

  constructor(
    private chapterService: ChapterService,
    @Inject(APP_CONFIG) private config: IAppConfig,
    private i18nService: I18nService
  ) {
    this.maxLengthChapter = config.MAXLENGTH_CHAPTER;
  }

  openEditChapterModal() {
    this.editChapterModal.emit({action: 'modal', params: ['open']});
  }

  openDeleteChapterModal() {
    this.deleteChapterModal.emit({action: 'modal', params: ['open']});
  }

  updateChapterTitle(title: string): void {
    const oldTitle = this.chapter.title;
    this.chapter.title = title;
    
    this.chapterService.update(this.chapter)
    .then((chapter) => { this.chapter.title = chapter.title; })
    .catch(() => {
        this.chapter.title = oldTitle;
        this.i18nService.error(20, '');
      });
  }

  deleteChapter() {
    this.chapterService
      .delete(this.chapter.id)
      .then(() => {
        this.deletedChapter.emit(this.chapter);
      })
      .catch( () => this.i18nService.error(21, this.chapter.title));
  }

  deleteQuestion(question) {
    this.chapter.questions.splice(this.chapter.questions.indexOf(question), 1);
  }

}
