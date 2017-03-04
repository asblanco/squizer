import { Component, OnInit }  from '@angular/core';
import { Course }             from '../shared/db/course';
import { CourseService }      from '../shared/db/course.service';

@Component({
  moduleId: module.id,
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  selectedCourse: Course;
  editCourseTitle: boolean = false;

  constructor(
    private courseService: CourseService) { }

  onSelected(course: Course) {
    this.selectedCourse = course;
    this.getCourseDetails(course.id);
  }

  ngOnInit():void { }

  getCourseDetails(courseId: number): void {
      this.courseService.getCourseDetails(courseId)
      .then(course => this.selectedCourse = course);
  }

  openNewChapterModal() {
    (<any>$('#newChapterModal')).openModal();
  }

  openDeleteCourseModal() {
    (<any>$('#deleteChapterModal')).openModal();
  }

  deleteCourse(course: Course): void {
    this.courseService
        .delete(course.id)
        .then(() => {
          //this.courses = this.courses.filter(c => c !== course);
          if (this.selectedCourse === course) { this.selectedCourse = null; }
        });
  }

  editCourseBtn() {
    this.editCourseTitle = !this.editCourseTitle;
  }

  updateCourseTitle() {
    this.editCourseTitle = !this.editCourseTitle;
  }

}
