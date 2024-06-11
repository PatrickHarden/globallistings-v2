export interface PlpQuery {
  readonly aspects?: string;
  readonly sort?: string;
  readonly radius?: string;
}

export enum TransactionType {
  sale = 'sale',
  letting = 'letting',
}

export interface PlpPath {
  readonly usageType: string;
  readonly transactionType: TransactionType;
  readonly location: string;
}

export function isPlpPathValue(value: string): value is keyof PlpPath {
  if (value === 'usageType' || value === 'transactionType' || value === 'location') {
    return true;
  }

  return false;
}

export function isPlpPathObject(path: object | null): path is PlpPath {
  const p = path as PlpPath;
  if (!p) {
    return false;
  }
  return !!p.usageType && !!p.transactionType && !!p.location;
}
