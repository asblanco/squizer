import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Chapter } from '../../shared/db/chapter';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, AfterViewInit {
  @Input() chapter: Chapter;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    (<any>$('.collapsible')).collapsible(); //casting to any
  }

}
