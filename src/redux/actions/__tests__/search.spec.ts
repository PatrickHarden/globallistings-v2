import { changeSearchFilter, setSearchLocation } from '../search';

describe(changeSearchFilter, () => {
  it('should create correct action', () => {
    expect(changeSearchFilter({ foo: 'zap' })).toMatchSnapshot();
  });
});

describe(setSearchLocation, () => {
  it('should create correct action', () => {
    expect(setSearchLocation('zap')).toMatchSnapshot();
  });
});
