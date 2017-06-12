import { expect } from 'chai';
import { mapUrl } from '../utils/url';

describe('mapUrl', () => {
  it('extracts nothing if both params are undefined', () => {
    expect(mapUrl(undefined, undefined)).to.deep.equal({
      action: null,
      params: []
    });
  });

  it('extracts nothing if the url is empty', () => {
    const url = '';
    const splittedUrlPath = url.split('?')[0].split('/').slice(1);
    const availableActions = { a: 1, widget: { c: 1, load: () => 'baz' } };

    expect(mapUrl(availableActions, splittedUrlPath)).to.deep.equal({
      action: null,
      params: []
    });
  });
});
