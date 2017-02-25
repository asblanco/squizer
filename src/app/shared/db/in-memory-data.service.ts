import { Injectable }         from '@angular/core';
import { InMemoryDbService }  from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
  let courses = [
      {id: 0, name: 'Tecnologias y Servicios Web'},
      {id: 1, name: 'Aplicaciones Web'},
      {id: 2, name: 'Bases de Datos'},
      {id: 3, name: 'Interfaces de Usuario'},
      {id: 4, name: 'Hardware y Aplicaciones Especificas'},
      {id: 5, name: 'Analisis de datos'},
      {id: 6, name: 'Estructuras de Datos'},
      {id: 7, name: 'Analisis de Algoritmos'},
      {id: 8, name: 'Complejidad Computacional'},
      {id: 9, name: 'Concurrencia y Distribucion'}
    ];
    return {courses};
  }

}
