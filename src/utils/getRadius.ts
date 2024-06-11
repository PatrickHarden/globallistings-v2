import { find, compose, defaultTo } from 'ramda';
import { LocationTypeDefinition } from '../types/config';
import { arraysEquivalent } from './arrays-equivalent';

const getDefaultLocationDefinition = (
  definitions: LocationTypeDefinition[]
): Partial<LocationTypeDefinition> => {
  const definition = definitions.find(def => def.name === 'default');
  if (!definition) {
    console.error('Failed to find a default LocationTypeDefinition');
    return { radius: 1 }; // TODO this is a hack we should have some logic to handle it in a better way
  }
  return { radius: definition.radius };
};

const getRadius = (definitions: LocationTypeDefinition[], types: string[]) => {
  // TODO fix typings
  return (compose as any)(
    (o: any) => o.radius,
    defaultTo(getDefaultLocationDefinition(definitions)),
    find((d: LocationTypeDefinition) => arraysEquivalent(d.definitions, types))
  )(definitions);
};

export default getRadius;
