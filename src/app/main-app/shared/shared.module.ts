import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeleteComponent } from './modals/delete/delete.component';
import { NewEditComponent } from './modals/new-edit/new-edit.component';

import { APP_CONFIG, ApiEndpointConfig } from './app-config/app-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DeleteComponent,
    NewEditComponent
  ],
  exports: [
    DeleteComponent,
    NewEditComponent
  ],
  providers: [{
      provide: APP_CONFIG,
      useValue: ApiEndpointConfig }
  ]
})
export class SharedModule {}
