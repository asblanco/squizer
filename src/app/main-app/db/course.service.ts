import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { AuthService } from '../../shared/auth/auth.service';
import { Course } from './course';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService {
  private url = this.config.apiEndpoint + 'course/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private authHttp: AuthHttp,
    private authService: AuthService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getCourses(): Promise<Course[]> {
    this.authService.refreshToken();
    return this.authHttp.get(this.url)
      .toPromise()
      .then(response => response.json() as Course[])
      .catch(this.handleError);
  }

  getCourseDetails(id: number): Promise<Course> {
    this.authService.refreshToken();
    const url = `${this.config.apiEndpoint}course-detail/${id}/`;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json() as Course)
      .catch(this.handleError);
  }

  create(name: string): Promise<Course> {
    this.authService.refreshToken();
    return this.authHttp
      .post(this.url, JSON.stringify({name: name, chapters: []}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(course: Course): Promise<Course> {
    this.authService.refreshToken();
    const url = `${this.url}${course.id}/`;
    return this.authHttp
      .put(url, JSON.stringify(course), {headers: this.headers})
      .toPromise()
      .then(() => course)
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
