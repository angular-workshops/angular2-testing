import { HeroService } from './hero.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ResponseOptions, Response} from '@angular/http';

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
      mockHttp.get.and.returnValue(Observable.of(createResponse({data: heroes})));

      service.getHeroes().then(retval => {
        expect(retval).toBe(heroes);
        done();
      });
  });
});

function createResponse(body) {
  return new Response(new ResponseOptions({ body }));
}
