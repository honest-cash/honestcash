/**
 * This function exists only for SSR because the SSR server does not support localStorage.
 */
export const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage;
  }

  return {
    setItem: (_key: string, _value: string) => void 0,
    getItem: (_key: string) => void 0,
    removeItem: (_key: string) => void 0
  };
};
