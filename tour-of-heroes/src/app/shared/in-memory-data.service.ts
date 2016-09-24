import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice', strength: 10},
      {id: 12, name: 'Narco', strength: 5},
      {id: 13, name: 'Bombasto', strength: 8},
      {id: 14, name: 'Celeritas', strength: 15},
      {id: 15, name: 'Magneta', strength: 2},
      {id: 16, name: 'RubberMan', strength: 50},
      {id: 17, name: 'Dynama', strength: 43},
      {id: 18, name: 'Dr IQ', strength: 4},
      {id: 19, name: 'Magma', strength: 18},
      {id: 20, name: 'Tornado', strength: 1000}
    ];
    return {heroes};
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
