import residentialResponse from '../../../tests/fixtures/residential-response.json';
import commercialResponse from '../../../tests/fixtures/commercial-response.json';
import { normaliseApiResponse } from '../index';
import {
  withHighlights,
  highlights,
  propertiesToApiResponse,
  withStrapline,
  straplines,
  longDescriptions,
  withLongDescription,
  emptyProperty,
  withAddress,
  address,
  withLocation,
  pointLocation,
} from '../../../tests/factories/propertyFactory';
import { path } from 'ramda';

// Silence console error so it doesn't flood the console
// TODO remove this once we have the strategy to push those to a error logging system
beforeEach(() => {
  console.error = jest.fn();
});

describe('map propertylistings api response', () => {
  it('should map correctly for residential data', () => {
    const data = normaliseApiResponse('en-GB')(residentialResponse);
    expect(data).toMatchSnapshot();
    expect(data.result).toEqual(['GB-ReapIT-cbrrps-CAL180002']);
  });

  it('should map correctly for commercial data', () => {
    const data = normaliseApiResponse('en-GB')(commercialResponse as any);
    expect(data).toMatchSnapshot();
  });

  const baseProperty = {
    ...withAddress(address),
    ...withLocation(pointLocation),
  };

  const MOCK_ID = 'MOCK_ID';
  const toData = (data: any) =>
    propertiesToApiResponse([{ ...baseProperty, ...data, 'Common.PrimaryKey': MOCK_ID }]);

  describe('with multilingual property:', () => {
    const firstPropertyPath = ['entities', 'properties', MOCK_ID];
    const propPath = (p: any) => path(firstPropertyPath.concat(p));

    [
      // highlights
      {
        data: toData(withHighlights([highlights.gym.en])),
        locale: 'en-GB',
        path: propPath(['highlights']),
        expected: [highlights.gym.en['Common.Text']],
        desc: 'english highlights for en-GB locale',
        group: 'highlights',
      },
      {
        data: toData(withHighlights([highlights.gym.fr])),
        locale: 'fr-FR',
        path: propPath(['highlights']),
        expected: [highlights.gym.fr['Common.Text']],
        desc: 'french highlights for fr-FR locale',
        group: 'highlights',
      },
      {
        data: toData(withHighlights([highlights.gym.en, highlights.gym.fr])),
        locale: 'fr-FR',
        path: propPath(['highlights']),
        expected: [highlights.gym.fr['Common.Text']],
        desc: 'french highlights for fr-FR locale with multilingual highlights',
        group: 'highlights',
      },
      {
        data: toData(withHighlights([highlights.gym.fr, highlights.gym.en])),
        locale: 'fr-FR',
        path: propPath(['highlights']),
        expected: [highlights.gym.fr['Common.Text']],
        desc: 'french highlights for fr-FR locale with multilingual highlights switched around',
        group: 'highlights',
      },

      // strapline
      {
        data: toData(withStrapline([straplines.en])),
        locale: 'en-GB',
        path: propPath(['description', 'strapline']),
        expected: straplines.en['Common.Text'],
        desc: 'english strapline for en-GB locale',
        group: 'strapline',
      },
      {
        data: toData(withStrapline([straplines.fr])),
        locale: 'fr-FR',
        path: propPath(['description', 'strapline']),
        expected: straplines.fr['Common.Text'],
        desc: 'french strapline for fr-FR locale',
        group: 'strapline',
      },
      {
        data: toData(withStrapline([straplines.fr, straplines.en])),
        locale: 'fr-FR',
        path: propPath(['description', 'strapline']),
        expected: straplines.fr['Common.Text'],
        desc: 'french strapline for fr-FR locale with multilingual highlights',
        group: 'strapline',
      },
      {
        data: toData(withStrapline([straplines.en, straplines.fr])),
        locale: 'fr-FR',
        path: propPath(['description', 'strapline']),
        expected: straplines.fr['Common.Text'],
        desc: 'french strapline for fr-FR locale with multilingual highlights switched around',
        group: 'strapline',
      },

      // long description
      {
        data: toData(withLongDescription([longDescriptions.en])),
        locale: 'en-GB',
        path: propPath(['description', 'longDescription']),
        expected: longDescriptions.en['Common.Text'],
        desc: 'english longDescription for en-GB locale',
        group: 'longDescription',
      },
      {
        data: toData(withLongDescription([longDescriptions.fr])),
        locale: 'fr-FR',
        path: propPath(['description', 'longDescription']),
        expected: longDescriptions.fr['Common.Text'],
        desc: 'french longDescription for fr-FR locale',
        group: 'longDescription',
      },
      {
        data: toData(withLongDescription([longDescriptions.fr, longDescriptions.en])),
        locale: 'fr-FR',
        path: propPath(['description', 'longDescription']),
        expected: longDescriptions.fr['Common.Text'],
        desc: 'french longDescription for fr-FR locale with multilingual highlights',
        group: 'longDescription',
      },
      {
        data: toData(withLongDescription([longDescriptions.en, longDescriptions.fr])),
        locale: 'fr-FR',
        path: propPath(['description', 'longDescription']),
        expected: longDescriptions.fr['Common.Text'],
        desc:
          'french longDescription for fr-FR locale with multilingual highlights switched around',
        group: 'longDescription',
      },
    ].forEach(td => {
      describe(td.group, () => {
        it(`should return ${td.desc}`, () => {
          const result = normaliseApiResponse(td.locale)(td.data as any);
          expect(td.path(result)).toEqual(td.expected);
        });
      });
    });
  });

  describe('with missing data', () => {
    it('should handle gracefully', () => {
      expect(() => normaliseApiResponse('en-GB')(emptyProperty as any)).not.toThrow();
    });
  });

  /**
   * TODO write some tests to check that we log info about missing properties
   * This can be a bit tricky as dependant on the property some fields can become mandatory or not.
   * Will need to wait until we have more details about what is mandatory and what is not
   */
});
