/* Feature Module */
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DeleteModule } from '../delete/delete.module';

import { ChapterComponent } from './course/chapter/chapter.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { CoursesSideNavComponent } from './courses-sidenav/courses-sidenav.component';
import { EditQuestionModalComponent } from './course/chapter/question/edit-question-modal/edit-question-modal.component';
import { NewEditComponent } from './course/new-edit/new-edit.component';
import { NewQuestionModalComponent } from './course/chapter/new-question-modal/new-question-modal.component';
import { QuestionComponent } from './course/chapter/question/question.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    CoursesRoutingModule,
    DeleteModule
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
  providers: []
})
export class CoursesModule implements OnInit {

  ngOnInit() {}

}
