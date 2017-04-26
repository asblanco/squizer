import { Component, OnDestroy, OnInit }  from '@angular/core';
import { Course }             from '../shared/db/course';
import { Chapter }            from '../shared/db/chapter';
import { Question }           from '../shared/db/question';
import { CourseService }      from '../shared/db/course.service';
import { CourseInfoService }  from './course-info.service';
import { ChapterService }     from '../shared/db/chapter.service';

import { NotificationsService } from 'angular2-notifications';
import { Subscription }         from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  oldTitleCourse: Course;
  selectedCourse: Course;
  editCourseTitle: boolean = false;
  subscription: Subscription;

  constructor( private courseInfoService:     CourseInfoService,
               private courseService:         CourseService,
               private chapterService:        ChapterService,
               private notificationsService:  NotificationsService )
  {
    this.subscription = courseInfoService.courseSelected$.subscribe(
      course => {
        this.selectedCourse = course;
        this.editCourseTitle = false;
        this.getCourseDetails(course.id);
    });
  }

  ngOnInit() {}

  openNewChapterModal() {
    (<any>$('#newChapterModal')).openModal();
  }

  openDeleteCourseModal() {
    (<any>$('#deleteCourseModal')).openModal();
  }


  /*
   *  Get, delete and updateTitle course methods
   */
  getCourseDetails(courseId: number): void {
      this.courseService.getCourseDetails(courseId)
      .then(course => {this.courseInfoService.course = course,
                       this.selectedCourse = this.courseInfoService.course})
      .catch(() => this.notificationsService.error("Error", "Al descargar detalles de asignatura."));
  }

  deleteCourse(course: Course): void {
    this.courseService
        .delete(course.id)
        .then(() => {
          this.courseInfoService.announceDeleteCourse(course);
          if (this.selectedCourse === course) { this.selectedCourse = null; }
        })
        .catch(() => this.notificationsService.error("Error", "Al eliminar asignatura " + course.name));
  }

  editCourseBtn(): void {
    this.editCourseTitle = true;
    this.oldTitleCourse = JSON.parse(JSON.stringify(this.selectedCourse)); //Save value without binding
  }

  cancelEditCourse(): void {
    this.courseInfoService.announceEditCourse(this.oldTitleCourse);
    this.selectedCourse = this.oldTitleCourse;
    this.editCourseTitle = false;
  }

  updateCourseTitle(): void {
    let updatedCourse = this.selectedCourse;

    this.courseService.update(updatedCourse)
    .then(() => {
      this.courseInfoService.announceEditCourse(updatedCourse);
      this.editCourseTitle = false;
    })
    .catch(() => {  this.cancelEditCourse(),
                    this.notificationsService.error("Error", "Al actualizar el titulo de la asignatura.")
                  });
  }

  /*
   *  Add new chapter
   */
  addChapter(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.chapterService.create(title, this.selectedCourse.id)
      .then(chapter => {
        this.courseInfoService.addChapter(chapter);
      })
      .catch(() => this.notificationsService.error("Error", "Al añadir el tema: " + title));
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private indexOf(array, item) {
      for (var i = 0; i < array.length; i++) {
          if (array[i].id === item.id) return i;
      }
      return -1;
  }

}
