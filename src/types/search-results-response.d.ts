interface SearchResultsResponse {
  Found: boolean;
  DocumentCount: number;
  Documents: Document[][];
  Aggregations: any[][];
  Took: string;
}

interface Document {
  'Common.PrimaryKey': string;
  'Common.Coordinate': CommonCoordinate;
  'Common.ContactGroup': CommonContactGroup;
  'Common.Charges': CommonCharge[];
  'Common.Highlights': CommonHighlight2[];
  'Dynamic.PrimaryImage': DynamicPrimaryImage;
  'Common.Sizes': CommonSize[];
  'Common.TotalSize': CommonTotalSize[];
  'Common.MinimumSize': CommonTotalSize[];
  'Common.ActualAddress': CommonAddress;
  'Common.Aspects': string[];
  'Common.NumberOfBedrooms': number;
  'Common.GeoLocation': CommonGeoLocation;
  'Dynamic.MinimumSize': CommonTotalSize[];
  'Dynamic.TotalSize': CommonTotalSize[];
}

interface CommonGeoLocation {
  geometry: Geometry;
  'Common.Exact': boolean;
}

interface Geometry {
  coordinates: number[];
  type: string;
}

interface CommonTotalSize {
  'Common.Size': number;
  'Common.Units': string;
}

interface CommonSize {
  'Common.Dimensions': CommonDimension[];
  'Common.SizeKind': string;
}

interface CommonDimension {
  'Common.DimensionsUnits': string;
  'Common.Amount': number;
}

interface DynamicPrimaryImage {
  'Common.ImageCaption': string;
  'Common.ImageResources': CommonImageResource[];
}

interface CommonImageResource {
  'Common.Image.Width': number;
  'Common.Image.Height': number;
  'Common.Breakpoint': string;
  'Source.Uri': string;
  'Common.Resource.Uri': string;
}

interface CommonHighlight2 {
  'Common.Highlight': CommonHighlight[];
}

interface CommonHighlight {
  'Common.CultureCode': string;
  'Common.Text': string;
}

interface CommonCharge {
  'Common.CurrencyCode'?: string;
  'Common.Year'?: number;
  'Common.PerUnit'?: string;
  'Common.AmountKind'?: string;
  'Common.TaxModifer'?: string;
  'Common.Interval'?: string;
  'Common.Amount'?: number;
  'Common.ChargeKind': string;
  'Common.OnApplication'?: boolean;
  'Common.ChargeModifer'?: string;
}

interface CommonContactGroup {
  'Common.GroupType': string;
  'Common.Address': CommonAddress;
  'Common.Contacts': CommonContact[];
}

interface CommonContact {
  'Common.TelephoneNumber': string;
  'Common.EmailAddress': string;
  'Common.AgentName': string;
}

interface CommonAddress {
  'Common.PostalAddresses': CommonPostalAddress[];
  'Common.Line2': string;
  'Common.Line1': string;
  'Common.Locallity': string;
  'Common.Country': string;
  'Common.PostCode': string;
}

interface CommonPostalAddress {
  'Common.Line2': string;
  'Common.Line1': string;
  'Common.Locallity': string;
  'Common.Language': string;
}

interface CommonCoordinate {
  lon: number;
  lat: number;
}
