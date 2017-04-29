/* Feature Module */
import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseInfoService } from './course-info.service';
import { SharedModule } from '../shared/shared.module';
import { CoursesSideNavService } from './courses-side-nav/courses-side-nav.service';

import { ChapterComponent } from './chapter/chapter.component';
import { NewQuestionModalComponent } from './chapter/new-question-modal/new-question-modal.component';
import { EditQuestionModalComponent } from './chapter/question/edit-question-modal/edit-question-modal.component';
import { QuestionComponent } from './chapter/question/question.component';
import { CoursesComponent } from './courses.component';
import { CoursesSideNavComponent } from './courses-side-nav/courses-side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CoursesComponent,
    ChapterComponent,
    QuestionComponent,
    NewQuestionModalComponent,
    EditQuestionModalComponent,
    CoursesSideNavComponent
  ],
  exports: [
    CoursesComponent,
    CoursesSideNavComponent
  ],
  providers: [
    CourseInfoService,
    CoursesSideNavService
  ]
})
export class CoursesModule implements OnInit {

  ngOnInit() {}

}
