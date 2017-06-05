import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { AuthService } from '../../shared/auth/auth.service';
import { Chapter } from './chapter';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChapterService {
  private url = this.config.apiEndpoint + 'chapter/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private authHttp: AuthHttp,
    private authService: AuthService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getChapters(): Promise<Chapter[]> {
    this.authService.refreshToken();
    return this.authHttp.get(this.url)
               .toPromise()
               .then(response => response.json() as Chapter[])
               .catch(this.handleError);
  }

  create(title: string, course: number): Promise<Chapter> {
    this.authService.refreshToken();
    return this.authHttp
      .post(this.url, JSON.stringify({course: course, title: title, questions: []}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(chapter: Chapter): Promise<Chapter> {
    this.authService.refreshToken();
    const url = `${this.url}${chapter.id}/`;
    return this.authHttp
      .put(url, JSON.stringify(chapter), {headers: this.headers})
      .toPromise()
      .then(() => chapter)
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
