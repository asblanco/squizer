import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

import { DeleteComponent } from './modals/delete/delete.component';

import { APP_CONFIG, AppConfig } from './app-config/app-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule
  ],
  declarations: [
    DeleteComponent
  ],
  exports: [
    DeleteComponent
  ],
  providers: [{
      provide: APP_CONFIG,
      useValue: AppConfig }
  ]
})
export class SharedModule {}
