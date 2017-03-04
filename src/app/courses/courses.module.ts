/* Feature Module */
import { NgModule, OnInit } from '@angular/core';
import { CommonModule }     from '@angular/common';

import { CoursesComponent } from './courses.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ChapterComponent } from './chapter/chapter.component';
import { QuestionComponent } from './chapter/question/question.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CoursesComponent,
    SideNavComponent,
    ChapterComponent,
    QuestionComponent
  ],
  exports: [ CoursesComponent ]
})
export class CoursesModule implements OnInit {

  ngOnInit() {

  }

}
