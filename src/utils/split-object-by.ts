import { pickBy, not, compose, ObjPred } from 'ramda';

/**
 * Splits an object into two based on a predicate
 * @param predicate A predicate used to split object into two
 */
export const splitObjectBy = (predicate: ObjPred) => (obj: object) => [
  pickBy(predicate)(obj),
  pickBy(
    compose(
      not,
      predicate
    )
  )(obj),
];
