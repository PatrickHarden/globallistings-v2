import { docToProperty } from '../doc-to-property-mapper';
import property from '../../../tests/fixtures/commercial-property.json';

describe(docToProperty, () => {
  it('should map full commercial property', () => {
    expect(docToProperty('en-GB')(property as Document)).toMatchSnapshot();
  });

  [
    { path: 'Common.ActualAddress', defined: false },
    { path: 'Common.Charges', defined: true },
    { path: 'Common.ContactGroup', defined: true },
    { path: 'Common.Highlights', defined: true },
    { path: 'Common.GeoLocation', defined: false },
    { path: 'Dynamic.PrimaryImage', defined: true },
    { path: 'Common.Sizes', defined: true },
  ].forEach(td => {
    it(`should map property without ${td.path}`, () => {
      const data = { ...property, [td.path]: undefined };
      if (td.defined) {
        expect(docToProperty('en-GB')(data as any)).toMatchSnapshot();
      } else {
        expect(docToProperty('en-GB')(data as any)).toEqual(undefined);
      }
    });
  });
});
