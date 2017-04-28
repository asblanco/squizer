/* Feature Module */
import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseInfoService } from './course-info.service';
import { SharedModule } from '../shared/shared.module';
import { SideNavService } from './side-nav/side-nav.service';

import { ChapterComponent } from './chapter/chapter.component';
import { NewQuestionModalComponent } from './chapter/new-question-modal/new-question-modal.component';
import { EditQuestionModalComponent } from './chapter/question/edit-question-modal/edit-question-modal.component';
import { QuestionComponent } from './chapter/question/question.component';
import { CoursesComponent } from './courses.component';
import { SideNavComponent } from './side-nav/side-nav.component';

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
    SideNavComponent
  ],
  exports: [ CoursesComponent ],
  providers: [
    CourseInfoService,
    SideNavService
  ]
})
export class CoursesModule implements OnInit {

  ngOnInit() {}

}
