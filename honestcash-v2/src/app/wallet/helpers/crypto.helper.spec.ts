import { CryptoHelper } from './crypto.helper';

describe('CryptoHelper', () => {
  it('calculates correct hashes', () => {
    const hash = CryptoHelper.calculatePasswordHash('test@email.com', 'testpassord');
    const hash2 = CryptoHelper.calculatePasswordHash('test@email.com', 'testpassord2');

    expect(hash)
    .toBe(
      // tslint:disable-next-line:max-line-length
      'a1b838ce8761095041c2f03d341fd4c8cb8c5ed31a2061dbc35a4df8d2ac1886274ccd9ca162e400d59216022e6ae3f1b31ae0b9db2779e475cd8eadb585024e',
    );

    expect(hash2)
    .toBe(
      // tslint:disable-next-line:max-line-length
      'dc9dd009062e06b81d903a8bea0c4a083afebb6508d6114337deefd0b48697356d636256f36abe9082a88ca17afce46972f73d97eaada710e27f1c86127d0f0e',
    );
  });
});
