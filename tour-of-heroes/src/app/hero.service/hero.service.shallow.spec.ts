import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let mockResponse, matchingHero, connection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
      ]
    });

    const heroes = [
      {id: 2, name: 'Rubberman'},
      {id: 4, name: 'Dynama'}
    ];
    mockResponse = new Response(new ResponseOptions({body: {data: heroes}, status: 200}));
  });

  describe('getHero', () => {

    // Subscribing to the connection and storing it for later
    it('should return the correct hero when called with a valid id', fakeAsync(
      inject([HeroService, MockBackend], (service: HeroService, backend: MockBackend) => {

        backend.connections.subscribe(c => connection = c);
        service.getHero(4).then(hero => matchingHero = hero);
        connection.mockRespond(mockResponse);
        tick();

        expect(matchingHero.id).toBe(4);
        expect(matchingHero.name).toBe('Dynama');
    })));

    // Subscribing to the connection and responding inside the subscription
    it('should return the correct hero when called with a valid id', fakeAsync(
      inject([HeroService, MockBackend], (service: HeroService, backend: MockBackend) => {

        backend.connections.subscribe(c => c.mockRespond(mockResponse));
        service.getHero(4).then(hero => matchingHero = hero);
        tick();

        expect(matchingHero.id).toBe(4);
        expect(matchingHero.name).toBe('Dynama');
    })));

    // Using the MockBackend.connectionsArray to get the connect
    it('should return the correct hero when called with a valid id', fakeAsync(
      inject([HeroService, MockBackend], (service: HeroService, backend: MockBackend) => {

        service.getHero(4).then(hero => matchingHero = hero);
        backend.connectionsArray[0].mockRespond(mockResponse);
        tick();

        expect(matchingHero.id).toBe(4);
        expect(matchingHero.name).toBe('Dynama');
    })));

    it('should return an empty array when called with an invalid id', fakeAsync(
      inject([HeroService, MockBackend], (service: HeroService, backend: MockBackend) => {
        backend.connections.subscribe(c => connection = c);

        service.getHero(45).then(hero => matchingHero = hero);
        connection.mockRespond(mockResponse);
        tick();

        expect(matchingHero).toBeUndefined();
    })));
  });
});
