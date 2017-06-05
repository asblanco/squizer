import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { AuthService } from '../../shared/auth/auth.service';
import { SchoolYear } from './schoolyear';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SchoolYearService {
  private url = this.config.apiEndpoint + 'schoolyear/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    public authHttp: AuthHttp,
    private authService: AuthService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getSchoolYears(): Promise<SchoolYear[]> {
    this.authService.refreshToken();
    return this.authHttp.get(this.config.apiEndpoint + 'schoolyears/')
               .toPromise()
               .then(response => response.json() as SchoolYear[])
               .catch(this.handleError);
  }

  getSchoolYear(id: number): Promise<SchoolYear> {
    this.authService.refreshToken();
    const url = `${this.url}${id}/`;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json() as SchoolYear)
      .catch(this.handleError);
  }

  create(schoolYear: SchoolYear): Promise<SchoolYear> {
    this.authService.refreshToken();
    return this.authHttp
      .post(this.url, JSON.stringify(schoolYear), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(schoolYear: SchoolYear): Promise<SchoolYear> {
    this.authService.refreshToken();
    const url = `${this.url}${schoolYear.id}/`;
    return this.authHttp
      .put(url, JSON.stringify(schoolYear), {headers: this.headers})
      .toPromise()
      .then(() => schoolYear)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    this.authService.refreshToken();
    const url = `${this.url}${id}/`;
    return this.authHttp.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
