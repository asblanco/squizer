import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Call } from './call';
import { APP_CONFIG } from '../../shared/app-config/app-config';
import { IAppConfig } from '../../shared/app-config/iapp-config';

@Injectable()
export class CallService {
  private url = this.config.apiEndpoint + 'call/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private authHttp: AuthHttp,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) { }

  getCall(id: number): Promise<Call> {
    const url = `${this.url}${id}/`;
    return this.authHttp.get(url)
      .toPromise()
      .then(response => response.json() as Call)
      .catch(this.handleError);
  }

  create(call: Call): Promise<Call> {
    return this.authHttp
      .post(this.url, JSON.stringify(call), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(call: Call): Promise<Call> {
    const url = `${this.url}${call.id}/`;
    return this.authHttp
      .put(url, JSON.stringify(call), {headers: this.headers})
      .toPromise()
      .then(() => call)
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
