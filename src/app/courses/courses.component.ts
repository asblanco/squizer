import { Component, OnInit }  from '@angular/core';
import { Course }             from '../shared/db/course';
import { Chapter }            from '../shared/db/chapter';
import { Question }           from '../shared/db/question';
import { CourseService }      from '../shared/db/course.service';
import { CourseInfoService }  from './course-info.service';
import { ChapterService }     from '../shared/db/chapter.service';

@Component({
  moduleId: module.id,
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  editedCourse: Course;
  selectedCourse: Course;
  editCourseTitle: boolean = false;

  constructor( private courseInfoService:  CourseInfoService,
               private courseService:      CourseService,
               private chapterService:     ChapterService     ) { }

  ngOnInit():void {
    this.getCourses();
  }

  onSelected(course: Course) {
    this.selectedCourse = course;
    this.editCourseTitle = false;
    this.getCourseDetails(course.id);
  }

  getCourses(): void {
    this.courseService.getCourses()
      .then(courses => this.courses = courses);
  }

  openNewChapterModal() {
    (<any>$('#newChapterModal')).openModal();
  }

  openDeleteCourseModal() {
    (<any>$('#deleteCourseModal')).openModal();
  }

  /* Get, delete and updateTitle course methods */

  getCourseDetails(courseId: number): void {
      this.courseService.getCourseDetails(courseId)
      .then(course => {this.courseInfoService.course = course,
                       this.selectedCourse = this.courseInfoService.course});
  }

  deleteCourse(course: Course): void {
    this.courseService
        .delete(course.id)
        .then(() => {
          this.courses.splice(this.indexOf(this.courses, course), 1);
          if (this.selectedCourse === course) { this.selectedCourse = null; }
        });
  }

  editCourseBtn(): void {
    this.editCourseTitle = true;
    this.editedCourse = JSON.parse(JSON.stringify(this.selectedCourse)); //Save value without binding
  }

  cancelEditCourse(): void {
    this.courses.splice(this.indexOf(this.courses, this.selectedCourse), 1, this.editedCourse);
    this.selectedCourse = this.editedCourse;
    this.editCourseTitle = false;
  }

  updateCourseTitle(): void {
    let newCourse = this.selectedCourse;

    this.courseService.update(newCourse)
    .then(() => {
      this.courses.splice(this.indexOf(this.courses, this.editedCourse), 1, newCourse),
      this.selectedCourse = newCourse,
      this.editCourseTitle = false;
    })
    .catch(() => this.cancelEditCourse());
  }

  private indexOf(array, item) {
      for (var i = 0; i < array.length; i++) {
          if (array[i].id === item.id) return i;
      }
      return -1;
  }

  /* Add new chapter */
  addChapter(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.chapterService.create(title, this.selectedCourse.id)
      .then(chapter => {
        this.courseInfoService.addChapter(chapter);
      });
  }

}
