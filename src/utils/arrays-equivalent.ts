import { isEmpty, symmetricDifference } from 'ramda';

export const arraysEquivalent = <T>(arr1: ReadonlyArray<T>, arr2: ReadonlyArray<T>): boolean =>
  isEmpty(symmetricDifference(arr1, arr2));
