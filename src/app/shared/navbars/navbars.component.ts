import { Component, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import { Course }             from '../../shared/db/course';
import { CourseService }      from '../../shared/db/course.service';
import { CourseInfoService }  from '../../courses/course-info.service';

import { Subscription }       from 'rxjs/Subscription';

@Component({
  selector: 'nav-bars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.css']
})
export class NavbarsComponent implements OnInit, AfterViewInit {
  @Input() courses: Course[] = [];
  activeTab: number = 1; //1=courses, 2=tests
  subscription: Subscription;

  constructor(
    private courseService: CourseService,
    private courseInfoService: CourseInfoService)
  {
    this.subscription = courseInfoService.courseDeleted$.subscribe(
      course => {
        this.courses.splice(this.indexOf(this.courses, course.id), 1);
    });
    this.subscription = courseInfoService.courseEdited$.subscribe(
      course => {
        this.courses.splice(this.indexOf(this.courses, course.id), 1, course);
    });
  }

  ngOnInit() {
    this.getCourses();
  }

  ngAfterViewInit() {
    (<any>$(".button-collapse")).sideNav();
  }

  select(course: Course) {
    this.courseInfoService.announceSelectCourse(course);
    (<any>$(".button-collapse")).sideNav('hide');
  }

  getCourses(): void {
    this.activeTab = 1;
    this.courseService.getCourses()
      .then(courses => this.courses = courses);
  }

  getTests(): void {
    this.activeTab = 2;
  }

  openCourseModal() {
    (<any>$('#newCourseModal')).openModal();
  }

  openYearModal() {
    (<any>$('#newYearModal')).openModal();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.courseService.create(name)
      .then(course => {
        this.courses.push(course);
        //this.onSelected.emit(course);
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private indexOf(array, itemId) {
      for (var i = 0; i < array.length; i++) {
          if (array[i].id === itemId) return i;
      }
      return -1;
  }

}
