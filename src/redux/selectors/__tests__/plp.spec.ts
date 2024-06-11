jest.mock('connected-react-router', () => ({
  createMatchSelector: () => () => ({ params: { usageType: 'office' } }),
}));

import { isUsageTypeConfigLoaded, configEndpointForCurrentUsageTypeSelector } from '../plp';
import { DeepPartial } from 'redux';
import { State } from '../../../types/state';

describe(isUsageTypeConfigLoaded, () => {
  it('should be true if currentConfig is missing', () => {
    const state: DeepPartial<State> = { entities: { config: {} } };

    const result = isUsageTypeConfigLoaded(state as State);

    expect(result).toEqual(true);
  });

  it('should be true if currentConfig is matching the url usageType', () => {
    const state: DeepPartial<State> = { entities: { config: { currentConfig: 'office' } } };

    const result = isUsageTypeConfigLoaded(state as State);

    expect(result).toEqual(true);
  });

  it('should be false if currentConfig is not matching the url usageType', () => {
    const state: DeepPartial<State> = { entities: { config: { currentConfig: 'other' } } };

    const result = isUsageTypeConfigLoaded(state as State);

    expect(result).toEqual(false);
  });
});

describe(configEndpointForCurrentUsageTypeSelector, () => {
  it('should return corresponding endpoint', () => {
    const state: DeepPartial<State> = {
      entities: { config: { otherConfigs: [{ name: 'office', endpoint: 'MOCK_ENDPOINT' }] } },
    };

    const result = configEndpointForCurrentUsageTypeSelector(state as State);

    expect(result).toEqual('MOCK_ENDPOINT');
  });

  it('should return corresponding endpoint', () => {
    const state: DeepPartial<State> = {
      entities: { config: { otherConfigs: [] } },
    };

    expect(() => configEndpointForCurrentUsageTypeSelector(state as State)).toThrowError(
      /endpoint mapping/
    );
  });
});
