import { AfterViewInit, Component, EventEmitter, Output, Input } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete.component.html'
})
export class DeleteComponent implements AfterViewInit {
  @Input() id: string;
  @Input() title: string;
  @Input() deleteModal = new EventEmitter<string|MaterializeAction>();
  @Output() onDeleted = new EventEmitter();

  constructor() { }

  ngAfterViewInit() {
    (<any>$('#' + this.id)).appendTo('body');
  }

  delete(): void {
    this.onDeleted.emit();
  }
}
