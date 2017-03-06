import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent{
  @Input('group') public answerForm: FormGroup;
  @Input() id: number;
  @Input() length: number;
  @Input() answerText: string;
  @Output() onRemoveAnswer = new EventEmitter<number>();

  removeAnswer(id: number) {
    this.onRemoveAnswer.emit(id);
  }

}
