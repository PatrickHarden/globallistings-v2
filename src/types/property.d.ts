export interface Property {
  readonly address: Address;
  readonly contacts?: Contact[];
  readonly description?: Description;
  readonly highlights?: string[];
  readonly id: string;
  readonly info?: Info;
  readonly location: Location;
  readonly numberOfBedrooms?: number;
  readonly photos: Photos;
  readonly charges?: Charge[];
  readonly size?: SizeRange;
}

export interface SizeRange {
  readonly min: Size;
  readonly max: Size;
}

export interface Size {
  readonly amount: number;
  readonly units: string;
}

export interface Charge {
  readonly currencyCode?: string;
  readonly year?: number;
  readonly perUnit?: string;
  readonly amountKind?: string;
  readonly taxModifier?: string;
  readonly interval?: string;
  readonly amount?: number;
  readonly chargeKind: string;
  readonly onApplication?: boolean;
  readonly chargeModifier?: string;
}

export interface Photos {
  readonly hero?: Hero;
  readonly main?: any;
}

export interface Hero {
  readonly large: string;
  readonly small: string;
}

export interface Location {
  readonly lat: number;
  readonly lon: number;
}

export interface Info {
  readonly energyPerformance: string;
  readonly floorPlans: string;
}

export interface Description {
  readonly longDescription: string;
  readonly strapline: string;
}

export interface Contact {
  readonly email: string;
  readonly name: string;
  readonly phone: string;
}

export interface Address {
  readonly Country: string;
  readonly Line1: string;
  readonly Line2: string;
  readonly Locality: string;
  readonly PostCode: string;
}
