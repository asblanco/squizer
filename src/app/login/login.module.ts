import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [
    LoginComponent
  ],
  exports: [ RouterModule ]
})
export class LoginModule {}
