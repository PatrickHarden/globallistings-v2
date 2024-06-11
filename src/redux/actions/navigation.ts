import { State } from '../../types/state';
import { replace, push } from 'connected-react-router';
import { stringify } from 'query-string';
import { Dictionary } from '../../types/common/dictionary';
import { PlpPath } from '../../types/plp';
import { generatePath } from 'react-router';
import RoutePaths from '../../constants/routePaths';
import { buildUrl } from '../../utils/build-url';
import { querySelector, pathSelector, queryStringSelector } from '../selectors/location';
import { plpUrlPathParamsSelector } from '../selectors/match';

export const updateQueryParams = (params: Dictionary<string>) => (
  dispatch: Function,
  getState: () => State
) => {
  const state = getState();
  const query = querySelector(state);
  const path = pathSelector(state);

  const newQuery = {
    ...query,
    ...params,
  };
  const newQueryStr = stringify(newQuery);
  dispatch(replace(buildUrl(path, newQueryStr)));
};

export const updatePath = (path: keyof PlpPath, value: string) => (
  dispatch: Function,
  getState: () => State
) => {
  const state = getState();
  const currentParams = plpUrlPathParamsSelector(state);
  const queryStr = queryStringSelector(state);

  const newPath = generatePath(RoutePaths.plp, { ...currentParams, [path]: value });
  dispatch(replace(buildUrl(newPath, queryStr)));
};

export const navigateToProperty = (propertyId: string) => (dispatch: Function) => {
  const newPath = generatePath(RoutePaths.pdp, { propertyId });
  dispatch(push(buildUrl(newPath, '')));
};
