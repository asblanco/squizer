import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerService } from './answer.service';
import { ChapterService } from './chapter.service';
import { CourseService } from './course.service';
import { QuestionService } from './question.service';
import { TermService } from './term.service';
import { SchoolYearService } from './schoolyear.service';
import { TestService } from './test.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
})
export class DbModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DbModule,
      providers: [
        AnswerService,
        TermService,
        ChapterService,
        CourseService,
        QuestionService,
        SchoolYearService,
        TestService
      ]
    };
  }
}
