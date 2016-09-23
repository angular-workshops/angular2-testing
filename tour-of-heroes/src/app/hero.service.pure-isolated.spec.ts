import { HeroService } from './hero.service';

describe('Service: HeroService (pure)', () => {

  it('should return the correct hero when called with a valid id', (done) => {

    const heroes = [
      {id: 2, name: 'Rubberman'},
      {id: 4, name: 'Dynama'}
    ];

    const mockResponse = {
      toPromise: () => {
        return new Promise((resolve, reject) => {
          resolve({ json: () => ({ data: heroes }) });
        });
      }
    };

    const mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post', 'put', 'delete']);
    mockHttp.get.and.returnValue(mockResponse);

    let service = new HeroService(mockHttp);

    service.getHeroes().then(retval => {
      expect(retval).toBe(heroes);
      done();
    });
  });
});
