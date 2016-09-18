/* tslint:disable:no-unused-variable */

import { async, fakeAsync, inject, flushMicrotasks } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HeroService } from './hero.service';
import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';


@Injectable()
class TestClass {
  constructor() {
  }

  doSomething() {
    return 5;
  }
}

describe('Service: HeroService', () => {
  let heroes;
  let mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post', 'put', 'delete']);

  beforeEach(() => {
    heroes = [
      {id: 2, name: 'Rubberman'},
      {id: 4, name: 'Dynama'}
    ];
  });


  it('should return the correct hero when called with a valid id', (done) => {
      let service = new HeroService(mockHttp);
      mockHttp.get.and.returnValue(createMockGetCallForAllHeroes());

      service.getHeroes().then(retval => {
        expect(retval).toBe([heroes]);
        done();
      });

  });

  function createMockGetCallForAllHeroes() {
    return {
      toPromise: () => {
        return new Promise((resolve, reject) => {
          const fakeResponse = {
            json: () => {
              return {
                data: heroes
              };
            }
          };
          resolve(fakeResponse);
        });
      }
    };
  }

});
