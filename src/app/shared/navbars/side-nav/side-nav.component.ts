import { Component, OnInit, EventEmitter, Output, Input }  from '@angular/core';
import { Course }         from '../../db/course';
import { CourseService }  from '../../db/course.service';

@Component({
  moduleId: module.id,
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() courses: Course[] = [];
  @Output() onSelected = new EventEmitter<Course>();
  @Input() activeTab: EventEmitter<number> = new EventEmitter();

  constructor(private courseService: CourseService) { }

  ngOnInit() { }

  select(course: Course) {
    this.onSelected.emit(course);
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
        this.onSelected.emit(course);
      });
  }
}
