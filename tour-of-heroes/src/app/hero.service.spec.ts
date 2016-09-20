/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HeroService } from './hero.service';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

describe('Service: HeroService', () => {
  let heroes, matchingHero, connection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });

    heroes = [
      {id: 2, name: 'Rubberman'},
      {id: 4, name: 'Dynama'}
    ];
  });

  describe('getHero', () => {

    it('should return the correct hero when called with a valid id', fakeAsync(
      inject([HeroService, MockBackend, Http], (service: HeroService, backend: MockBackend, http: Http) => {
        backend.connections.subscribe(c => connection = c);

        service.getHero(4).then(hero => {
          matchingHero = hero;
        });
        connection.mockRespond(createResponse(heroes));
        tick();

        expect(matchingHero.id).toBe(4);
        expect(matchingHero.name).toBe('Dynama');
    })));

    it('should return an empty array when called with an invalid id', fakeAsync(
      inject([HeroService, MockBackend, Http], (service: HeroService, backend: MockBackend, http: Http) => {
        backend.connections.subscribe(c => connection = c);

        service.getHero(45).then(hero => {
          matchingHero = hero;
        });
        connection.mockRespond(createResponse(heroes));
        tick();

        expect(matchingHero).toBeUndefined();
    })));

  });

  function createResponse(data) {
    return new Response(new ResponseOptions({body: {data: data}, status: 200}));
  }
});
