import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  chapterTitle:string = 'Chapter title';
  chapterContent:string = 'Lorem ipsum dolor sit amet.';

  constructor() { }

  ngOnInit() {
  }

}
