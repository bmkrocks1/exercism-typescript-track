import { hello } from './hello-world';

test('hello-world', () => {
  expect(hello()).toEqual('Hello, World!');
});
