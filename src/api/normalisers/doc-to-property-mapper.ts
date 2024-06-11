import { path, map, compose, prop, find, propEq, composeWith, isNil, chain } from 'ramda';
import { Maybe } from '../../types/common/maybe';
import { Hero, Charge, SizeRange, Property } from '../../types/property';

const key = prop('Common.PrimaryKey');
const safeCompose = composeWith((f: any, res: any) => (isNil(res) ? res : f(res)));

const safeComposeAndLog = (msg = 'unknown') =>
  composeWith((f: any, res: any) => {
    if (isNil(res)) {
      // TODO better error handling
      console.error(msg);
      return res;
    }
    return f(res);
  });

const composeAndLog = (propertyName: string, doc: Document) =>
  safeComposeAndLog(`Failed to map "${propertyName}" for property with id: ${key(doc)}`);

const getItemForLocale = (locale: string) => find(h => h['Common.CultureCode'] === locale);

const mapAddress = (address: CommonAddress | undefined) => {
  if (!address) {
    throw new Error('Address must be present on the property');
  }
  return {
    Country: address['Common.Country'],
    Line1: address['Common.Line1'],
    Line2: address['Common.Line2'],
    Locality: address['Common.Locallity'],
    PostCode: address['Common.PostCode'],
  };
};

const docToAddress = (doc: Document) => mapAddress(doc['Common.ActualAddress']);

const docToNumberOfBedrooms = (doc: Document) => doc['Common.NumberOfBedrooms'];

const mapLocation = (location: number[] | undefined) => {
  if (!location) {
    throw new Error('Property must have a location defined');
  }
  const [lat, lon] = location;
  return { lat, lon };
};

const docToLocation = (doc: Document) =>
  compose(
    mapLocation,
    path(['Common.GeoLocation', 'geometry', 'coordinates'])
  )(doc);

const mapContact = (contact: CommonContact) => ({
  phone: contact['Common.EmailAddress'],
  email: contact['Common.TelephoneNumber'],
  name: contact['Common.AgentName'],
});

const docToContacts = (doc: Document) =>
  composeAndLog('Common.ContactGroup', doc)([
    map(mapContact),
    path(['Common.ContactGroup', 'Common.Contacts']),
  ])(doc);

const docToHighlights = (locale: string) => (doc: Document) =>
  composeAndLog('Common.Highlights', doc)([
    map(prop('Common.Text')),
    compose(
      map(getItemForLocale(locale)),
      map(prop('Common.Highlight'))
    ),
    prop('Common.Highlights'),
  ])(doc);

const docToStrapline = (locale: string) =>
  safeCompose([prop('Common.Text'), getItemForLocale(locale), prop('Common.Strapline')]);

const docToLongDescription = (locale: string) =>
  safeCompose([prop('Common.Text'), getItemForLocale(locale), prop('Common.LongDescription')]);

const mapEnergyPerformance = safeCompose([
  map(prop('Common.Uri')),
  prop('Common.EnergyPerformanceInformation'),
]);

const mapFloorPlans = safeCompose([
  map(prop('Common.Resource.Uri')),
  chain((p: DynamicPrimaryImage) => p['Common.ImageResources']),
  prop('Common.FloorPlans'),
]);

type ImageSize = 'small' | 'large';

const getImgUri = (size: ImageSize) =>
  compose(
    (img: CommonImageResource) => img['Common.Resource.Uri'],
    find(propEq('Common.Breakpoint', size))
  );

const mapToImg = safeCompose([
  (imgs: CommonImageResource[]) => ({
    small: getImgUri('small')(imgs),
    large: getImgUri('large')(imgs),
  }),
  prop('Common.ImageResources'),
]);

const mapPhotos = safeCompose([map(mapToImg), prop('Common.Photos')]);

const getHeroPhoto = compose<Document, DynamicPrimaryImage, Hero>(
  mapToImg,
  prop('Dynamic.PrimaryImage')
);

const mapCommonChargeToCharge = (commonCharge: CommonCharge): Charge => ({
  currencyCode: commonCharge['Common.CurrencyCode'],
  year: commonCharge['Common.Year'],
  perUnit: commonCharge['Common.PerUnit'],
  amountKind: commonCharge['Common.AmountKind'],
  taxModifier: commonCharge['Common.TaxModifer'],
  interval: commonCharge['Common.Interval'],
  amount: commonCharge['Common.Amount'],
  chargeKind: commonCharge['Common.ChargeKind'],
  onApplication: commonCharge['Common.OnApplication'],
  chargeModifier: commonCharge['Common.ChargeModifer'],
});

const docToCharges = safeCompose([map(mapCommonChargeToCharge), prop('Common.Charges')]);

// TODO add tests for missing min size and max size
const docToSizeRange = (doc: Document): Maybe<SizeRange> => {
  if (!doc['Common.Sizes']) {
    return undefined;
  }

  const minSize = doc['Common.Sizes'].find(s => s['Common.SizeKind'] === 'MinimumSize');
  const maxSize = doc['Common.Sizes'].find(s => s['Common.SizeKind'] === 'TotalSize');
  if (!minSize || !maxSize) {
    return undefined;
  }

  const minSizeValue = minSize['Common.Dimensions'][0];
  const maxSizeValue = maxSize['Common.Dimensions'][0];

  return {
    min: {
      amount: minSizeValue['Common.Amount'],
      units: minSizeValue['Common.DimensionsUnits'],
    },
    max: {
      amount: maxSizeValue['Common.Amount'],
      units: maxSizeValue['Common.DimensionsUnits'],
    },
  };
};

const mapId = (doc: Document) => doc['Common.PrimaryKey'];

export const docToProperty = (locale: string) => (doc: Document): Maybe<Property> => {
  try {
    return {
      address: docToAddress(doc),
      numberOfBedrooms: docToNumberOfBedrooms(doc),
      location: docToLocation(doc),
      contacts: docToContacts(doc),
      highlights: docToHighlights(locale)(doc),
      description: {
        strapline: docToStrapline(locale)(doc),
        longDescription: docToLongDescription(locale)(doc),
      },
      info: {
        energyPerformance: mapEnergyPerformance(doc),
        floorPlans: mapFloorPlans(doc),
      },
      photos: {
        hero: getHeroPhoto(doc),
        main: mapPhotos(doc),
      },
      charges: docToCharges(doc),
      id: mapId(doc),
      size: docToSizeRange(doc),
    };
  } catch (ex) {
    console.error(`Failed mapping property: ${mapId(doc)}`);
    console.error(ex);
    return undefined;
  }
};
