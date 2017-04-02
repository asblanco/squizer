import { Component, OnInit, Input, AfterViewInit }    from '@angular/core';

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

  constructor(
    private courseInfoService: CourseInfoService,
    private chapterService: ChapterService) { }

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
    .catch(() => this.chapter.title = oldTitle);
  }

  deleteChapter(chapter: Chapter): void {
    this.chapterService
        .delete(chapter.id)
        .then(() => {
          this.courseInfoService.deleteChapter(chapter);
        });
  }

}
