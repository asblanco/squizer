import { Component, Inject, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { APP_CONFIG } from '../../../shared/app-config/app-config';
import { IAppConfig } from '../../../shared/app-config/iapp-config';

import { Course } from '../../db/course';
import { Chapter } from '../../db/chapter';
import { Question } from '../../db/question';
import { CourseService } from '../../db/course.service';
import { ChapterService } from '../../db/chapter.service';
import { CoursesSideNavService } from '../courses-sidenav/courses-sidenav.service';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { i18nService } from '../../../shared/i18n/i18n.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnDestroy {
  oldTitleCourse: string;
  courseId: number;
  course: Course;
  editCourseTitle = false; // Type is already inferred, no need to implicitly declare the type (angular style guide)
  subscription: Subscription;
  maxLengthCourse: number;
  maxLengthChapter: number;
  deleteModal = new EventEmitter<string|MaterializeAction>();
  newChapterModal = new EventEmitter<string|MaterializeAction>();

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(APP_CONFIG) private config: IAppConfig,
    private courseService: CourseService,
    private coursesSideNavService: CoursesSideNavService,
    private chapterService: ChapterService,
    private i18nService: i18nService,
    private router: Router
 ) {
   this.maxLengthCourse = config.MAXLENGTH_COURSE;
   this.maxLengthChapter = config.MAXLENGTH_CHAPTER;

    this.subscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.courseId = params['courseId'];
      this.getCourse(this.courseId);
      this.editCourseTitle = false;
    });
  }

  openNewChapterModal() {
    this.newChapterModal.emit({action: 'modal', params: ['open']});
  }

  openDeleteCourseModal() {
    this.deleteModal.emit({action: 'modal', params: ['open']});
  }

  /*
   *  Get, delete and updateTitle course methods
   */
  getCourse(courseId: number): void {
      this.courseService.getCourseDetails(courseId)
      .then(course => { this.course = course; })
      .catch(() => this.i18nService.error(10, ''));
  }

  deleteCourse(course: Course): void {
    this.courseService
        .delete(course.id)
        .then(() => {
          this.coursesSideNavService.deleteCourse(course);
          this.router.navigate(['/manage-courses/']);
        })
        .catch(() => this.i18nService.error(17, course.name));
  }

  deleteChapter(chapter) {
    this.course.chapters.splice(this.course.chapters.indexOf(chapter), 1);
  }

  editCourseBtn(): void {
    this.editCourseTitle = true;
    this.oldTitleCourse = this.course.name;
  }

  cancelEditCourse(): void {
    this.course.name = this.oldTitleCourse;
    this.editCourseTitle = false;
  }

  updateCourseTitle(): void {
    this.courseService.update(this.course)
    .then(() => {
      this.coursesSideNavService.editCourse(this.course);
      this.editCourseTitle = false;
    })
    .catch(() => {  this.cancelEditCourse();
                    this.i18nService.error(18, ''); });
  }

  /*
   *  Add new chapter
   */
  addChapter(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.chapterService.create(title, this.course.id)
      .then(chapter => {
        this.course.chapters.push(chapter);
      })
      .catch(() => this.i18nService.error(19, title));
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
