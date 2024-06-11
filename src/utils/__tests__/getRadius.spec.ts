import getRadius from '../getRadius';
import { LocationTypeDefinition } from '../../types/config';

const types = ['city'];
const definitions: LocationTypeDefinition[] = [
  { name: 'default', definitions: [], radius: 1 },
  { name: 'neighbourhood', definitions: ['neighborhood'], radius: 0.25 },
  {
    name: 'london area',
    definitions: ['administrative_area_level_3'],
    radius: 0.25,
  },
  { name: 'Postcode', definitions: ['postal_code'], radius: 0.25 },
  { name: 'City', definitions: ['locality'], radius: 5 },
  { name: 'Town', definitions: ['postal_town'], radius: 0.25 },
  {
    name: 'county',
    definitions: ['administrative_area_level_2'],
    radius: 0.25,
  },
  {
    name: 'country',
    definitions: ['administrative_area_level_1', 'country'],
    radius: 0.5,
  },
];

describe(getRadius, () => {
  it('should return default radius if no types provided', () => {
    var radius = getRadius(definitions, []);
    expect(radius).toEqual(1);
  });

  it('should return default radius if no matching types', () => {
    var radius = getRadius(definitions, types);
    expect(radius).toEqual(1);
  });

  it('should return compiled query string when definitions match types', () => {
    var radius = getRadius(definitions, ['postal_code']);
    expect(radius).toEqual(0.25);
  });

  it('should return default if array of definitions can not be matched', () => {
    var radius = getRadius(definitions, ['postal_code', 'locality']);
    expect(radius).toEqual(1);
  });

  it('should return compiled query string when definitions match multiple types', () => {
    var radius = getRadius(definitions, ['administrative_area_level_1', 'country']);
    expect(radius).toEqual(0.5);
  });

  // TODO what do we do in this case?
  it('should not return compiled query string when definitions partially match multiple types', () => {
    var radius = getRadius(definitions, ['administrative_area_level_1']);
    expect(radius).toEqual(1);
  });

  it('should not break if no definitions are passed', () => {
    var radius = getRadius([], []);
    expect(radius).toEqual(1);
  });
});
