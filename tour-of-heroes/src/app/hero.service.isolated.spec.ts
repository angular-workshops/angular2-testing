import { HeroService } from './hero.service';

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
        expect(retval).toBe(heroes);
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
