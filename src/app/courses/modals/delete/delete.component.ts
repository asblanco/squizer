import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Output() onDeleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  delete(): void {
    this.onDeleted.emit();
  }
}
