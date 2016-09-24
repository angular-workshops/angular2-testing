import { HeroService } from './hero.service';
import { Observable } from 'rxjs/Observable';
import { ResponseOptions, Response } from '@angular/http';

describe('Service: HeroService', () => {

  it('should return the correct hero when called with a valid id', (done) => {

    const heroes = [
      {id: 2, name: 'Rubberman'},
      {id: 4, name: 'Dynama'}
    ];

    const mockResponse = new Response(new ResponseOptions({ body: {data: heroes} }));

    const mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post', 'put', 'delete']);
    mockHttp.get.and.returnValue(Observable.of(mockResponse));

    let service = new HeroService(mockHttp);

    service.getHeroes().then(retval => {
      expect(retval).toBe(heroes);
      done();
    });
  });
});
