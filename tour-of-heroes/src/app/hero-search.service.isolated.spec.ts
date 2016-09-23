import { Observable } from 'rxjs/Observable';
import { ResponseOptions, Response } from '@angular/http';
import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

describe('HeroSearchService', () => {

  it('should make a request via http', () => {
    const expectedResults = [new Hero(), new Hero()];
    const mockResponse = new Response(new ResponseOptions({ body: { data: expectedResults } }));

    const mockHttp = jasmine.createSpyObj('http', ['get']);
    mockHttp.get.and.returnValue(Observable.of(mockResponse));

    const service = new HeroSearchService(mockHttp as any);

    let actualResults;
    service.search('mysearch').subscribe((value) => { actualResults = value; });

    expect(mockHttp.get).toHaveBeenCalledWith('app/heroes/?name=mysearch');
    expect(actualResults).toEqual(expectedResults);
  });
});
