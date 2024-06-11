import { buildUrl } from '../build-url';

describe(buildUrl, () => {
  it('should build url without query params and path', () => {
    expect(buildUrl('', '')).toEqual('');
  });

  it('should build url without query params', () => {
    expect(buildUrl('/zap', '')).toEqual('/zap');
  });

  it('should build url with query params and path', () => {
    expect(buildUrl('/zap', '?foo=bam')).toEqual('/zap?foo=bam');
  });

  it('should build url with query params without questionmark and path', () => {
    expect(buildUrl('/zap', 'foo=bam')).toEqual('/zap?foo=bam');
  });
});
