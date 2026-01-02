import { useEffect, useState } from 'react';
import { getStoredAuth } from './api';

export function useAccessToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const auth = getStoredAuth();
    setToken(auth?.accessToken ?? null);
  }, []);

  return token;
}
