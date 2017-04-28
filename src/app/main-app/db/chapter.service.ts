import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { APP_CONFIG } from '../shared/app-config/app-config';
import { IAppConfig } from '../shared/app-config/iapp-config';
import { Chapter } from './chapter';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChapterService {
  private url = this.config.apiEndpoint + 'chapters/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getChapters(): Promise<Chapter[]> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json() as Chapter[])
               .catch(this.handleError);
  }

  create(title: string, course: number): Promise<Chapter> {
    return this.http
      .post(this.url, JSON.stringify({course: course, title: title, questions: []}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(chapter: Chapter): Promise<Chapter> {
    const url = `${this.url}${chapter.id}/`;
    return this.http
      .put(url, JSON.stringify(chapter), {headers: this.headers})
      .toPromise()
      .then(() => chapter)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}${id}/`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
