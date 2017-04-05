/* Feature Module */
import { NgModule, OnInit } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { SharedModule }     from '../shared/shared.module';

import { CourseInfoService }  from './course-info.service';

import { CoursesComponent }   from './courses.component';
import { ChapterComponent }   from './chapter/chapter.component';
import { QuestionComponent }  from './chapter/question/question.component';
import { NewQuestionModalComponent }  from './chapter/new-question-modal/new-question-modal.component';
import { EditQuestionModalComponent } from './chapter/question/edit-question-modal/edit-question-modal.component';


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
    EditQuestionModalComponent
  ],
  exports: [ CoursesComponent ],
  providers: [ CourseInfoService ]
})
export class CoursesModule implements OnInit {

  ngOnInit() {}

}
