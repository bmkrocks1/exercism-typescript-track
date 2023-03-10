import { Crypto } from './crypto-square';

describe('Crypto.normalize', () => {
  it('empty string', () => {
    expect(Crypto.normalize('')).toEqual('');
  });
  it('Lowercase', () => {
    expect(Crypto.normalize('A')).toEqual('a');
  });
  it('Remove spaces', () => {
    expect(Crypto.normalize('  b ')).toEqual('b');
  });
  it('Remove punctuations', () => {
    expect(Crypto.normalize('@1,%!')).toEqual('1');
  });
  it('This is fun!', () => {
    expect(Crypto.normalize('This is fun!')).toEqual('thisisfun');
  });
});

describe('Crypto.calculateDimension', () => {
  it('54 => [7, 8]', () => {
    expect(Crypto.calculateDimension(54)).toEqual([7, 8]);
  });
  it('64 => [8, 8]', () => {
    expect(Crypto.calculateDimension(64)).toEqual([8, 8]);
  });
  it('1 => [1, 1]', () => {
    expect(Crypto.calculateDimension(1)).toEqual([1, 1]);
  });
  it('2 => [1, 2]', () => {
    expect(Crypto.calculateDimension(2)).toEqual([1, 2]);
  });
  it('9 => [3, 3]', () => {
    expect(Crypto.calculateDimension(9)).toEqual([3, 3]);
  });
});

describe('Crypto', () => {
  it('empty plaintext results in an empty ciphertext', () => {
    const crypto = new Crypto('');
    expect(crypto.ciphertext).toEqual('');
  });
  it('Lowercase', () => {
    const crypto = new Crypto('A');
    expect(crypto.ciphertext).toEqual('a');
  });
  it('Remove spaces', () => {
    const crypto = new Crypto('  b ');
    expect(crypto.ciphertext).toEqual('b');
  });
  it('Remove punctuation', () => {
    const crypto = new Crypto('@1,%!');
    expect(crypto.ciphertext).toEqual('1');
  });
  it('9 character plaintext results in 3 chunks of 3 characters', () => {
    const crypto = new Crypto('This is fun!');
    expect(crypto.ciphertext).toEqual('tsf hiu isn');
  });
  it('8 character plaintext results in 3 chunks, the last one with a trailing space', () => {
    const crypto = new Crypto('Chill out.');
    expect(crypto.ciphertext).toEqual('clu hlt io ');
  });
  it('54 character plaintext results in 7 chunks, the last two with trailing spaces', () => {
    const crypto = new Crypto(
      'If man was meant to stay on the ground, god would have given us roots.'
    );
    expect(crypto.ciphertext).toEqual(
      'imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn  sseoau '
    );
  });
});
