jest.mock('../../selectors/location');
jest.mock('../../selectors/config/config');
jest.mock('../../../api/google-maps/places');

import { validateUrl } from '../geocode';
import { plpLocationNameSelector } from '../../selectors/location';
import { restrictionsSelector } from '../../selectors/config/config';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { State } from '../../../types/state';
import { placeGeocode } from '../../../api/google-maps/places';

const middlewares = [thunk];
const mockStore = configureMockStore<State>(middlewares);

describe(validateUrl, () => {
  it('should dispatch correct actions for a failed request', async () => {
    // Arrange
    ((restrictionsSelector as unknown) as jest.Mock).mockReturnValue({
      country: 'UK',
    });
    ((plpLocationNameSelector as unknown) as jest.Mock).mockReturnValue('London');
    ((placeGeocode as unknown) as jest.Mock).mockReturnValue(Promise.reject(new Error('Boom')));
    const store = mockStore({} as State);

    // Act
    await store.dispatch(validateUrl() as any);
    const actions = store.getActions();

    // Assert
    expect(actions).toEqual([
      { meta: { hash: 'London' }, type: 'GEOCODE_REQUEST' },
      { meta: { hash: 'London' }, payload: expect.any(Object), type: 'GEOCODE_FAILURE' },
    ]);
  });

  it('should dispatch correct actions for a successful request', async () => {
    // Arrange
    ((restrictionsSelector as unknown) as jest.Mock).mockReturnValue({
      country: 'UK',
    });
    ((plpLocationNameSelector as unknown) as jest.Mock).mockReturnValue('London');
    ((placeGeocode as unknown) as jest.Mock).mockReturnValue(Promise.resolve([]));
    const store = mockStore({} as State);

    // Act
    await store.dispatch(validateUrl() as any);
    const actions = store.getActions();

    // Assert
    expect(actions).toEqual([
      { meta: { hash: 'London' }, type: 'GEOCODE_REQUEST' },
      {
        meta: { hash: 'London', receivedAt: expect.any(Number) },
        payload: [],
        type: 'GEOCODE_SUCCESS',
      },
    ]);
  });
});
