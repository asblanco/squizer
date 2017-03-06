/* Feature Module */
import { NgModule, OnInit } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { CoursesComponent } from './courses.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ChapterComponent } from './chapter/chapter.component';
import { QuestionComponent } from './chapter/question/question.component';
import { AnswerFormComponent } from './chapter/answer-form/answer-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CoursesComponent,
    SideNavComponent,
    ChapterComponent,
    QuestionComponent,
    AnswerFormComponent
  ],
  exports: [ CoursesComponent ]
})
export class CoursesModule implements OnInit {

  ngOnInit() {

  }

}
