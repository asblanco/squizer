import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {
  @Input() id: string;
  @Input() title: string;
  @Output() onDeleted = new EventEmitter();

  constructor() { }

  delete(): void {
    this.onDeleted.emit();
  }
}
