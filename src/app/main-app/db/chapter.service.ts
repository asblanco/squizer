import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';
import { Chapter } from './chapter';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChapterService {
  private url = this.config.apiEndpoint + 'chapter/';

  constructor(
    private authHttp: AuthHttp,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getChapters(): Promise<Chapter[]> {
    return this.authHttp.get(this.url)
               .toPromise()
               .then(response => response.json() as Chapter[])
               .catch(this.handleError);
  }

  create(title: string, course: number): Promise<Chapter> {
    return this.authHttp
      .post(this.url, JSON.stringify({course: course, title: title, questions: []}))
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(chapter: Chapter): Promise<Chapter> {
    const url = `${this.url}${chapter.id}/`;
    return this.authHttp
      .put(url, JSON.stringify(chapter))
      .toPromise()
      .then(() => chapter)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
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
