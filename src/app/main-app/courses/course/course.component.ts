import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Course } from '../../db/course';
import { Chapter } from '../../db/chapter';
import { Question } from '../../db/question';
import { CourseService } from '../../db/course.service';
import { ChapterService } from '../../db/chapter.service';
import { CoursesSideNavService } from '../courses-side-nav/courses-side-nav.service';

import { NotificationsService } from 'angular2-notifications';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private coursesSideNavService: CoursesSideNavService,
    private chapterService: ChapterService,
    private notificationsService: NotificationsService,
    private router: Router
 ) {
    this.subscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.courseId = params['courseId'];
      this.getCourse(this.courseId);
      this.editCourseTitle = false;
    });
  }

  openNewChapterModal() {
    (<any>$('#newChapterModal')).openModal();
  }

  openDeleteCourseModal() {
    (<any>$('#deleteCourseModal')).openModal();
  }

  /*
   *  Get, delete and updateTitle course methods
   */
  getCourse(courseId: number): void {
      this.courseService.getCourseDetails(courseId)
      .then(course => { this.course = course; })
      .catch(() => this.notificationsService.error('Error', 'Al descargar detalles de asignatura.'));
  }

  deleteCourse(course: Course): void {
    this.courseService
        .delete(course.id)
        .then(() => {
          this.coursesSideNavService.deleteCourse(course);
          this.router.navigate(['/manage-courses/']);
        })
        .catch(() => this.notificationsService.error('Error', 'Al eliminar asignatura ' + course.name));
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
                    this.notificationsService.error('Error', 'Al actualizar el titulo de la asignatura.'); });
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
      .catch(() => this.notificationsService.error('Error', 'Al añadir el tema: ' + title));
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
