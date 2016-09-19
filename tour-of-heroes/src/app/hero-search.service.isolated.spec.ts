import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ResponseOptions, Response} from '@angular/http';
import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';


describe('HeroSearchService', () => {
  let mockHttp: { get: jasmine.Spy };
  let service: HeroSearchService;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('http', ['get']);
    service = new HeroSearchService(mockHttp as any);
  });

  it('should make a request via http', () => {
    const expectedResults = [new Hero(), new Hero()];
    mockHttp.get.and.returnValue(createResponse(expectedResults));

    let actualResults;
    service.search('mysearch').subscribe((value) => { actualResults = value; });

    expect(mockHttp.get).toHaveBeenCalledWith('app/heroes/?name=mysearch');
    expect(actualResults).toEqual(expectedResults);
  });
});

function createResponse(data) {
  const response = new Response(new ResponseOptions({ body: { data } }));
  return Observable.of(response);
}
