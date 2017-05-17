import { InjectionToken } from '@angular/core';
import { IAppConfig } from './iapp-config';

export const AppConfig: IAppConfig = {
    // apiEndpoint: 'https://squizer-server.herokuapp.com/',
    apiEndpoint: 'http://localhost:8000/',
    MAXLENGTH_COURSE: 100,
    MAXLENGTH_CHAPTER: 100,
    MAXLENGTH_QUESTION: 500,
    MAXLENGTH_ANSWER: 1000,
    MAXLENGTH_SCHOOLYEAR: 100,
    MAXLENGTH_CALL: 100,
    MAXLENGTH_TEST: 100
};

export let APP_CONFIG = new InjectionToken<IAppConfig>('app-config');
