import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-new-edit-modal',
  templateUrl: './new-edit.component.html'
})
export class NewEditComponent {
  @Input() modalId: string;
  @Input() text: string;
  @Input() title: string;
  @Output() onSubmit = new EventEmitter<string>();

  constructor() { }

  submit(form: any): void {
    this.onSubmit.emit(form.value.title);
    form.reset();
  }
}
