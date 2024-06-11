import axios from 'axios';
import {
  createRequestPending,
  createRequestFailure,
  createRequestSuccess,
} from '../../types/common/action-creators-singular';
import { Config } from '../../types/config';
import { State } from '../../types/state';
import { configEndpointForCurrentUsageTypeSelector } from '../selectors/plp';

export const createFetchConfigRequest = createRequestPending('FETCH_CONFIG_REQUEST');
export const createFetchConfigFailure = createRequestFailure('FETCH_CONFIG_FAILURE');
export const createFetchConfigSuccess = createRequestSuccess<Config, 'FETCH_CONFIG_SUCCESS'>(
  'FETCH_CONFIG_SUCCESS'
);

// This will be used in the future to switch between multiple configs
export const fetchConfig = () => (dispatch: Function, getState: () => State) => {
  const state = getState();
  const configEndpoint = configEndpointForCurrentUsageTypeSelector(state);

  dispatch(createFetchConfigRequest());
  return axios
    .get(configEndpoint)
    .then(res => {
      dispatch(createFetchConfigSuccess(res.data));
    })
    .catch(ex => {
      dispatch(createFetchConfigFailure(ex));
    });
};
