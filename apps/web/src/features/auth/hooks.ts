import { useEffect, useState } from 'react';
import { getValidAccessToken } from './api';

export function useAccessToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void (async () => {
      const accessToken = await getValidAccessToken();
      if (active) {
        setToken(accessToken);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return token;
}
