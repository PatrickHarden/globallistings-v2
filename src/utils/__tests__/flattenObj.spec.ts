import flattenObject from '../flattenObj';

describe(flattenObject, () => {
  [
    {
      obj: {},
      expected: {},
      desc: 'should flatten empty to object to empty object',
    },
    {
      obj: { a: 'foo' },
      expected: { a: 'foo' },
      desc: 'should return simple object',
    },
    {
      obj: { a: 'foo', b: { zap: 'zap' } },
      expected: { a: 'foo', zap: 'zap' },
      desc: 'should flatten nested object',
    },
    {
      obj: {
        a: 'foo',
        b: [1, 2, 3],
        c: true,
        d: { e: 'bam', f: { g: 'zap' } },
      },
      expected: { a: 'foo', b: [1, 2, 3], c: true, e: 'bam', g: 'zap' },
      desc: 'should flatten complex nested object',
    },
    {
      obj: {
        a: 'foo',
        d: { a: 'zap' },
      },
      expected: { a: 'zap' },
      desc: 'should overwrite duplicate keys',
    },
  ].forEach(t => {
    it(t.desc, () => {
      expect(flattenObject(t.obj)).toEqual(t.expected);
    });
  });
});
