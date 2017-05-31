import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from '../shared/auth/auth-guard.service';
import { AuthService } from '../shared/auth/auth.service';
import { MaterializeModule } from 'angular2-materialize';

import { APP_CONFIG, AppConfig } from './app-config/app-config';

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterializeModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: APP_CONFIG,
      useValue: AppConfig
    }
  ]
})
export class SharedModule {}
