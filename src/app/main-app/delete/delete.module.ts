import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete.component';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule
  ],
  declarations: [ DeleteComponent ],
  exports: [ DeleteComponent ]
})
export class DeleteModule {}
