import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { APP_CONFIG } from '../shared/app-config/app-config';
import { IAppConfig } from '../shared/app-config/iapp-config';

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials;
  lang: string;

  constructor(
    private auth: AuthService,
    @Inject(APP_CONFIG) private config: IAppConfig,
    private router: Router,
  ) {
    this.lang = document.URL.split('/', 4)[3];
    if (auth.loggedIn()) {
      this.router.navigate(['/manage-tests']);
    }
  }

  ngOnInit() {
    this.credentials = {
      username: '',
      password: ''
    };
  }

  onLogin(credentials) {
    this.auth.login(credentials);
  }

}
