import { capitalise } from '../capitalise';

describe(capitalise, () => {
  it('should capitalise a string', () => {
    expect(capitalise('foo')).toEqual('Foo');
  });
});
