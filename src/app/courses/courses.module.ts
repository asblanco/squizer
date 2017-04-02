/* Feature Module */
import { NgModule, OnInit } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { CoursesComponent } from './courses.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ChapterComponent } from './chapter/chapter.component';
import { QuestionComponent } from './chapter/question/question.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { NewComponent } from './modals/new/new.component';

import { CourseInfoService } from './course-info.service';
import { NewQuestionModalComponent } from './chapter/new-question-modal/new-question-modal.component';

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
    DeleteComponent,
    NewComponent,
    NewQuestionModalComponent,
  ],
  exports: [ CoursesComponent ],
  providers: [ CourseInfoService ]
})
export class CoursesModule implements OnInit {

  ngOnInit() {

  }

}
