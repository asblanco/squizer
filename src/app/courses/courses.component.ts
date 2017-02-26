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

}
