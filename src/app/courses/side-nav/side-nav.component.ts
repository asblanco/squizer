import { Component, OnInit, Input }  from '@angular/core';
import { Course } from '../../shared/db/course';

@Component({
  moduleId: module.id,
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() courses: Course[] = [];

  constructor() { }

  ngOnInit() {
  }

}
