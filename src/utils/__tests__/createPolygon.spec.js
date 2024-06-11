import createPolygon from '../createPolygon';
describe('Utils', () => {
  describe('createPolygon', () => {
    describe('Creating a polygon from a gmaps viewport object', () => {
      const viewport = {
        getCenter: () => {
          return {
            lat: () => {},
            lng: () => {},
          };
        },
        getNorthEast: () => {
          return {
            lat: () => {
              return 0;
            },
            lng: () => {
              return 1;
            },
          };
        },
        getSouthWest: () => {
          return {
            lat: () => {
              return 2;
            },
            lng: () => {
              return 3;
            },
          };
        },
      };
      const LondonPoly = '"0,1","2,1","2,3","0,3"';
      let polygon;

      describe('When the viewport object is passed to the polygon utility', () => {
        beforeEach(() => {
          polygon = createPolygon(viewport);
        });

        describe('The returned polygon object', () => {
          it('should contain a polygon property with a formatted polygon', () => {
            expect(polygon.polygon).toBe(LondonPoly);
          });

          it('should contain a centre property', () => {
            expect(polygon.hasOwnProperty('centre')).toBeTruthy();
          });
        });
      });
    });
  });
});
