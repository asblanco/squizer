import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Course } from '../../db/course';
import { Chapter } from '../../db/chapter';
import { Question } from '../../db/question';
import { CourseService } from '../../db/course.service';
import { CourseInfoService } from '../course-info.service';
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
  oldTitleCourse: Course;
  courseId: number;
  course: Course;
  editCourseTitle = false; // Type is already inferred, no need to implicitly declare the type (angular style guide)
  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseInfoService: CourseInfoService,
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
      .then(course => { this.courseInfoService.course = course;
                        this.course = this.courseInfoService.course; })
      .catch(() => this.notificationsService.error('Error', 'Al descargar detalles de asignatura.'));
  }

  deleteCourse(course: Course): void {
    this.courseService
        .delete(course.id)
        .then(() => {
          this.coursesSideNavService.announceDeleteCourse(course);
          this.router.navigate(['/manage-courses/']);
        })
        .catch(() => this.notificationsService.error('Error', 'Al eliminar asignatura ' + course.name));
  }

  editCourseBtn(): void {
    this.editCourseTitle = true;
    this.oldTitleCourse = JSON.parse(JSON.stringify(this.course)); // Save value without binding
  }

  cancelEditCourse(): void {
    this.courseInfoService.announceEditCourse(this.oldTitleCourse);
    this.course = this.oldTitleCourse;
    this.editCourseTitle = false;
  }

  updateCourseTitle(): void {
    const updatedCourse = this.course;

    this.courseService.update(updatedCourse)
    .then(() => {
      this.courseInfoService.announceEditCourse(updatedCourse);
      this.coursesSideNavService.editCourse(updatedCourse);
      this.editCourseTitle = false;
    })
    .catch(() => {  this.cancelEditCourse();
                    this.notificationsService.error('Error', 'Al actualizar el titulo de la asignatura.');
                  });
  }

  /*
   *  Add new chapter
   */
  addChapter(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.chapterService.create(title, this.course.id)
      .then(chapter => {
        this.courseInfoService.addChapter(chapter);
      })
      .catch(() => this.notificationsService.error('Error', 'Al añadir el tema: ' + title));
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private indexOf(array, item) {
      for (let i = 0; i < array.length; i++) {
          if (array[i].id === item.id) { return i; }
      }
      return -1;
  }

}
