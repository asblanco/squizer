/* Feature Module */
import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoursesSideNavService } from './courses-side-nav/courses-side-nav.service';
import { SharedModule } from '../shared/shared.module';
import { MaterializeModule } from 'angular2-materialize';

import { ChapterComponent } from './course/chapter/chapter.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { CoursesSideNavComponent } from './courses-side-nav/courses-side-nav.component';
import { EditQuestionModalComponent } from './course/chapter/question/edit-question-modal/edit-question-modal.component';
import { NewEditComponent } from './course/new-edit/new-edit.component';
import { NewQuestionModalComponent } from './course/chapter/new-question-modal/new-question-modal.component';
import { QuestionComponent } from './course/chapter/question/question.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ChapterComponent,
    CourseComponent,
    CoursesComponent,
    CoursesSideNavComponent,
    EditQuestionModalComponent,
    NewEditComponent,
    NewQuestionModalComponent,
    QuestionComponent
  ],
  exports: [
    CoursesComponent,
    CoursesSideNavComponent
  ],
  providers: [
    CoursesSideNavService
  ]
})
export class CoursesModule implements OnInit {

  ngOnInit() {}

}
