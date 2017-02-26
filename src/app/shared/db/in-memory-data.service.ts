import { Injectable }         from '@angular/core';
import { InMemoryDbService }  from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
  let courses = [
      {id: 1, name: 'Tecnologias y Servicios Web', chapters: [
        {id: 0, courseId: 1, title: 'Tema 1: Introduccion', questions: [
          {id: 0, courseId: 1, chapterId: 0, title: 'What\'s the wheather today?', answers: [
            {id: 0, courseId: 1, chapterId: 0, questionId: 0, title: "No answer", correct: true},
            {id: 1, courseId: 1, chapterId: 0, questionId: 0, title: "All are correct", correct: true},
            {id: 2, courseId: 1, chapterId: 0, questionId: 0, title: "All are incorrect", correct: true}
          ]},
          {id: 1, courseId: 1, chapterId: 0, title: 'What\'s the wheather tomorrow?'},
          {id: 2, courseId: 1, chapterId: 0, title: 'What was the wheather yesterday?'}
        ]},
        {id: 1, courseId: 1, title: 'Tema 2: Continuacion', questions: [
          {id: 0, courseId: 1, chapterId: 1, title: 'What\'s the wheather today?', answers: [
            {id: 0, courseId: 1, chapterId: 1, questionId: 0, title: "No answer", correct: true},
            {id: 1, courseId: 1, chapterId: 1, questionId: 0, title: "All are correct", correct: true},
            {id: 2, courseId: 1, chapterId: 1, questionId: 0, title: "All are incorrect", correct: true}
          ]},
          {id: 1, courseId: 1, chapterId: 0, title: 'What\'s the wheather tomorrow?'},
          {id: 2, courseId: 1, chapterId: 0, title: 'What was the wheather yesterday?'}
        ]},
        {id: 2, courseId: 1, title: 'Tema 3: Advance'},
        {id: 3, courseId: 1, title: 'Tema 4: Expert'}
      ]},
      {id: 2, name: 'Aplicaciones Web', chapters: [
        {id: 0, courseId: 2, title: 'Tema 1: Introduccion', questions: [
          {id: 0, courseId: 2, chapterId: 0, title: 'What\'s the wheather today?', answers: [
            {id: 0, courseId: 2, chapterId: 0, questionId: 0, title: "No answer", correct: true},
            {id: 1, courseId: 2, chapterId: 0, questionId: 0, title: "All are correct", correct: true},
            {id: 2, courseId: 2, chapterId: 0, questionId: 0, title: "All are incorrect", correct: true}
          ]},
          {id: 1, courseId: 2, chapterId: 0, title: 'What\'s the wheather tomorrow?'},
          {id: 2, courseId: 2, chapterId: 0, title: 'What was the wheather yesterday?'}
        ]},
        {id: 1, courseId: 2, title: 'Tema 2: Continuacion'},
        {id: 2, courseId: 2, title: 'Tema 3: Advance'},
        {id: 3, courseId: 2, title: 'Tema 4: Expert'}
      ]},
      {id: 3, name: 'Interfaces de Usuario'},
      {id: 4, name: 'Hardware y Aplicaciones Especificas',  },
      {id: 5, name: 'Analisis de datos'},
      {id: 6, name: 'Estructuras de Datos'},
      {id: 7, name: 'Analisis de Algoritmos'},
      {id: 8, name: 'Complejidad Computacional'},
      {id: 9, name: 'Concurrencia y Distribucion'}
    ];

    let chapters = [
      {id: 0, courseId: 0, title: 'Tema 1: Introduccion'},
      {id: 1, courseId: 0, title: 'Tema 2: Continuacion'},
      {id: 2, courseId: 0, title: 'Tema 3: Advance'},
      {id: 3, courseId: 0, title: 'Tema 4: Expert'},
      {id: 4, courseId: 1, title: 'Tema 1: Introduccion'},
      {id: 5, courseId: 1, title: 'Tema 2: Continuacion'},
      {id: 6, courseId: 1, title: 'Tema 3: Advance'},
      {id: 7, courseId: 1, title: 'Tema 4: Expert'}
    ];

    let questions = [
      {id: 0, courseId: 0, chapterId: 0, title: 'What\'s the wheather today?'},
      {id: 1, courseId: 0, chapterId: 0, title: 'What\'s the wheather tomorrow?'},
      {id: 2, courseId: 0, chapterId: 0, title: 'What was the wheather yesterday?'},
      {id: 3, courseId: 0, chapterId: 1, title: 'What\'s the wheather today?'},
      {id: 4, courseId: 0, chapterId: 2, title: 'What\'s the wheather tomorrow?'},
      {id: 5, courseId: 0, chapterId: 3, title: 'What was the wheather yesterday?'},
      {id: 6, courseId: 1, chapterId: 1, title: 'What\'s the wheather today?'},
      {id: 7, courseId: 1, chapterId: 2, title: 'What\'s the wheather tomorrow?'},
      {id: 8, courseId: 1, chapterId: 3, title: 'What was the wheather yesterday?'}
    ];

    return {courses};
  }

}
