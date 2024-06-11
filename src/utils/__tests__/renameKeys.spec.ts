import renameKeys from '../renameKeys';

describe(renameKeys, () => {
  it('should rename a key according to the map', () => {
    const keyMap = {
      firstName: 'name',
    };

    const obj = {
      firstName: 'John',
    };

    expect(renameKeys(keyMap, obj)).toEqual({ name: 'John' });
  });

  it('should remove a key if it is not present in the map', () => {
    const obj = {
      firstName: 'John',
    };

    expect(renameKeys({}, obj)).toEqual({});
  });

  it('should ignore unrelated mappings', () => {
    const keyMap = {
      secondName: 'name',
    };

    const obj = {
      firstName: 'John',
    };

    expect(renameKeys(keyMap, obj)).toEqual({});
  });
});
