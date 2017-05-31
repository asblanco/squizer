import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials;

  constructor(private auth: AuthService, private router: Router) {
    if(auth.loggedIn()) {
      this.router.navigate(['/manage-tests']);
    }
  }

  ngOnInit() {
    this.credentials = {
      username: '',
      password: ''
    }
  }

  onLogin(credentials) {
    this.auth.login(credentials);
  }

}
