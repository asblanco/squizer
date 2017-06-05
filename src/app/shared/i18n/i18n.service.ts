import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { errors, alerts, info } from './i18n';

@Injectable()
export class I18nService {
  private lang: string;
  private default = 0;

  constructor(
    private notificationsService: NotificationsService
  ) {
    this.lang = document.URL.split('/', 4)[3];
  }

  error(number: number, str: string) {
    switch (this.lang) {
       case 'en':
          this.notificationsService.error('Error', errors[0][number] + str);
          break;
       case 'es':
          this.notificationsService.error('Error', errors[1][number] + str);
          break;
       case 'gl':
          this.notificationsService.error('Error', errors[2][number] + str);
          break;
       default:
          this.notificationsService.error('Error', errors[this.default][number] + str);
          break;
    }
  }

  alert(number: number) {
    switch (this.lang) {
       case 'en':
          this.notificationsService.alert('Alert', alerts[0][number]);
          break;
       case 'es':
          this.notificationsService.alert('Alerta', alerts[1][number]);
          break;
       case 'gl':
          this.notificationsService.alert('Alerta', alerts[2][number]);
          break;
       default:
          this.notificationsService.alert('Alert', alerts[this.default][number]);
          break;
    }
  }

  info(number: number) {
    switch (this.lang) {
       case 'en':
          this.notificationsService.info('Pay Attention', info[0][number]);
          break;
       case 'es':
          this.notificationsService.info('Cuidado', info[1][number]);
          break;
       case 'gl':
          this.notificationsService.info('Coidado', info[2][number]);
          break;
       default:
          this.notificationsService.info('Pay Attention', info[this.default][number]);
          break;
    }
  }

}
