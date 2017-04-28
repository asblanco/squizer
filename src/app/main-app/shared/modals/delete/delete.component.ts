import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
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
