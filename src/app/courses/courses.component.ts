import { Component, OnInit, OnDestroy }  from '@angular/core';
import { Course }             from '../shared/db/course';
import { Chapter }            from '../shared/db/chapter';
import { Question }           from '../shared/db/question';
import { CourseService }      from '../shared/db/course.service';
import { CourseInfoService }  from './course-info.service';
import { ChapterService }     from '../shared/db/chapter.service';

import { Subscription }       from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  //courses: Course[] = [];
  editedCourse: Course;
  selectedCourse: Course;
  editCourseTitle: boolean = false;
  subscription: Subscription;

  constructor( private courseInfoService:  CourseInfoService,
               private courseService:      CourseService,
               private chapterService:     ChapterService     )
  {
    this.subscription = courseInfoService.courseSelected$.subscribe(
      course => {
        this.selectedCourse = course;
        this.editCourseTitle = false;
        this.getCourseDetails(course.id);
    });
  }

  ngOnInit() {}

  onSelected(course: Course) {
    this.selectedCourse = course;
    this.editCourseTitle = false;
    this.getCourseDetails(course.id);
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

  getCourseDetails(courseId: number): void {
      this.courseService.getCourseDetails(courseId)
      .then(course => {this.courseInfoService.course = course,
                       this.selectedCourse = this.courseInfoService.course});
  }

  deleteCourse(course: Course): void {
    this.courseService
        .delete(course.id)
        .then(() => {
          this.courseInfoService.announceDeleteCourse(course);
          if (this.selectedCourse === course) { this.selectedCourse = null; }
        });
  }

  editCourseBtn(): void {
    this.editCourseTitle = true;
    this.editedCourse = JSON.parse(JSON.stringify(this.selectedCourse)); //Save value without binding
  }

  cancelEditCourse(): void {
    this.courseInfoService.announceEditCourse(this.editedCourse);
    this.selectedCourse = this.editedCourse;
    this.editCourseTitle = false;
  }

  updateCourseTitle(): void {
    let newCourse = this.selectedCourse;

    this.courseService.update(newCourse)
    .then(() => {
      this.courseInfoService.announceEditCourse(newCourse);
      this.selectedCourse = newCourse,
      this.editCourseTitle = false;
    })
    .catch(() => this.cancelEditCourse());
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
      });
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
