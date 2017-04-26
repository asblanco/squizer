import { Component, OnInit, Input, AfterViewInit }    from '@angular/core';

import { Chapter }  from '../../shared/db/chapter';
import { Question } from '../../shared/db/question';
import { ChapterService }     from '../../shared/db/chapter.service';
import { CourseInfoService }  from '../course-info.service';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, AfterViewInit {
  @Input() chapter: Chapter;

  constructor(
    private courseInfoService: CourseInfoService,
    private chapterService: ChapterService,
    private notificationsService: NotificationsService ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    (<any>$('.collapsible')).collapsible(); //casting to any
  }

  openEditChapterModal() {
    (<any>$('#editChapterModal'+this.chapter.id)).openModal();
  }

  openNewQuestionModal() {
    (<any>$('#newQuestionModal'+this.chapter.id)).openModal({dismissible: false});
  }

  openDeleteChapterModal() {
    (<any>$('#deleteChapterModal'+this.chapter.id)).openModal();
  }

  /* Edit and remove chapter */
  updateChapterTitle(title: string): void {
    let oldTitle = this.chapter.title;
    this.chapter.title = title;
    this.chapterService.update(this.chapter)
    .then(() => { })
    .catch(() => {  this.chapter.title = oldTitle,
                    this.notificationsService.error("Error", "Al actualizar el titulo del tema.")});
  }

  deleteChapter(chapter: Chapter): void {
    this.chapterService
        .delete(chapter.id)
        .then(() => {
          this.courseInfoService.deleteChapter(chapter);
        })
        .catch( () => this.notificationsService.error("Error", "Al eliminar el capitulo: " + chapter.title));
  }

}
