import { Component, OnInit } from '@angular/core';
import { Course }         from '../shared/db/course';
import { CourseService }  from '../shared/db/course.service';

@Component({
  moduleId: module.id,
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit():void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses()
      .then(courses => this.courses = courses);
  }

}
