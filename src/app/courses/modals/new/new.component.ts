import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'new-modal',
  templateUrl: './new.component.html'
})
export class NewComponent{
  @Input() modalId: string;
  @Input() newText: string;
  @Output() onAdded = new EventEmitter<string>();

  constructor() { }

  add(title: string): void {
    this.onAdded.emit(title);
  }
}
