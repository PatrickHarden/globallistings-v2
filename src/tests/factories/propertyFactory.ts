export const highlights = {
  gym: {
    en: {
      'Common.CultureCode': 'en-GB',
      'Common.Text': 'Gym',
    },
    fr: {
      'Common.CultureCode': 'fr-FR',
      'Common.Text': 'Gymnastique',
    },
  },
};

export const straplines = {
  en: {
    'Common.CultureCode': 'en-GB',
    'Common.Text': 'A mock english strapline',
  },
  fr: {
    'Common.CultureCode': 'fr-FR',
    'Common.Text': 'A mock french strapline',
  },
};

export const longDescriptions = {
  en: {
    'Common.CultureCode': 'en-GB',
    'Common.Text': 'Long mock english description',
  },
  fr: {
    'Common.CultureCode': 'fr-FR',
    'Common.Text': 'Long mock french description',
  },
};

export const address = {
  'Common.PostalAddresses': [
    {
      'Common.Line2': '45 Curlew Street',
      'Common.Line1': 'India House',
      'Common.Locallity': 'London',
      'Common.Language': 'en',
    },
  ],
  'Common.Line2': '45 Curlew Street',
  'Common.Line1': 'India House',
  'Common.Locallity': 'London',
  'Common.Country': 'UK',
  'Common.PostCode': 'SE1 2ND',
};

export const withAddress = (adr: any) => ({
  'Common.ActualAddress': adr,
});

export const pointLocation = {
  geometry: {
    coordinates: [51.502504599999988, -0.073653000000035718],
    type: 'Point',
  },
  'Common.Exact': true,
};

export const withLocation = (l: any) => ({ 'Common.GeoLocation': l });

export const withHighlights = (h: any) => ({
  'Common.Highlights': [{ 'Common.Highlight': h }],
});

export const withoutHighlights = {
  'Common.Highlights': undefined,
};

export const withStrapline = (str: any) => ({
  'Common.Strapline': str,
});

export const withLongDescription = (ld: any) => ({
  'Common.LongDescription': ld,
});

export const withoutImages = { 'Common.Photos': undefined };

export const getProperties = (data: any) => data.Documents[0];

export const propertiesToApiResponse = (properties: any) => ({
  Found: true,
  DocumentCount: 1,
  Documents: [properties],
});

export const emptyProperty = propertiesToApiResponse([{ 'Common.PrimaryKey': 'MOCK_PRIMARY_KEY' }]);
