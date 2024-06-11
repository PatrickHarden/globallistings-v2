import { splitObjectBy } from '../split-object-by';

describe(splitObjectBy, () => {
  it('splits empty object on true predicate', () => {
    expect(splitObjectBy(() => true)({})).toEqual([{}, {}]);
  });

  it('splits empty object on false predicate', () => {
    expect(splitObjectBy(() => false)({})).toEqual([{}, {}]);
  });

  it('splits object based on key predicate', () => {
    expect(
      splitObjectBy((value, key) => key.startsWith('a'))({ a: 'a', aa: 'aa', aaa: 'aaa', b: 'b' })
    ).toEqual([{ a: 'a', aa: 'aa', aaa: 'aaa' }, { b: 'b' }]);
  });

  it('splits object based on value predicate', () => {
    expect(
      splitObjectBy((value, key) => value.startsWith('a'))({ a: 'b', aa: 'bb', aaa: 'bbb', b: 'a' })
    ).toEqual([{ b: 'a' }, { a: 'b', aa: 'bb', aaa: 'bbb' }]);
  });
});
