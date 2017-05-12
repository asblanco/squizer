import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Question } from '../../../../db/question';
import { QuestionService } from '../../../../db/question.service';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: Question;
  @Input() i: number;
  @Output() deletedQuestion: EventEmitter<Question> = new EventEmitter();
  editQuestionModal = new EventEmitter<string|MaterializeAction>();
  deleteQuestionModal = new EventEmitter<string|MaterializeAction>();

  constructor(
    private questionService: QuestionService,
    private notificationsService: NotificationsService ) { }

  openEditQuestionModal() {
    this.editQuestionModal.emit({action:"modal",params:['open']});
  }

  openDeleteQuestionModal() {
    this.deleteQuestionModal.emit({action:"modal",params:['open']});
  }

  editQuestion(question: Question) {
    this.question = question;
  }

  deleteQuestion() {
    this.questionService.delete(this.question.id)
      .then(() => {
        this.deletedQuestion.emit(this.question);
      })
      .catch(() => this.notificationsService.error('Error', 'Al eliminar la pregunta: ' + this.question.title));
  }
}
