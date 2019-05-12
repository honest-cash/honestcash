/**
 * Creates mocked object of any class provided as a `clazz` param. Returned object has all methods already mocked,
 * which means you don't have to (you can't!) invoke `spyOn` on it.
 *
 * @usage
 * Creating a mock:
 * ```typescript
 * let mock: StorageService = TestUtils.mock(StorageService);
 * ```
 *
 * Spying the method:
 * ```typescript
 * (<Spy>mock.getFromStorage).and.returnValue(someValue)
 * ```
 *
 * Verifying spied methods:
 * ```typescript
 * expect((<Spy>mock.getFromStorage).calls.count() === 1);
 * expect((<Spy>mock.getFromStorage).calls.argsFor(0)[0]).toMatch(expectedInputParam);
 * ```
 *
 * @returns mocked object of `clazz` instance
 */
export function mock(clazz, name?) {
  const keys = [];
  for (const key in clazz.prototype) {
    keys.push(key);
  }

  // dummy wrapper for jasmine for ssr
  return keys.length > 0 ? (() => typeof jasmine !== undefined ? jasmine : {} as any)().createSpyObj(name || 'mock', keys) : {};
}
