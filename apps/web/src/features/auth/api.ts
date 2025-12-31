import { getPublicEnv } from '@/lib/env';

type AuthStorage = {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  expiresAt: number;
};

const PKCE_VERIFIER_KEY = 'kc_pkce_verifier';
const PKCE_STATE_KEY = 'kc_pkce_state';
const PKCE_REMEMBER_KEY = 'kc_pkce_remember';
const AUTH_STORAGE_KEY = 'kc_auth';

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sha256(message: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  return crypto.subtle.digest('SHA-256', data);
}

function generateVerifier(length = 64): string {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const random = new Uint8Array(length);
  crypto.getRandomValues(random);
  return Array.from(random)
    .map((x) => charset[x % charset.length])
    .join('');
}

function getAuthConfig() {
  const { keycloakUrl, keycloakRealm, keycloakClientId, appUrl } =
    getPublicEnv();
  return {
    issuer: `${keycloakUrl}/realms/${keycloakRealm}`,
    clientId: keycloakClientId,
    redirectUri: `${appUrl}/keycloak/callback`,
  };
}

export async function startKeycloakLogin(params: {
  email?: string;
  rememberMe?: boolean;
}): Promise<void> {
  const { issuer, clientId, redirectUri } = getAuthConfig();
  const verifier = generateVerifier();
  const challenge = base64UrlEncode(await sha256(verifier));
  const state = generateVerifier(16);

  sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
  sessionStorage.setItem(PKCE_STATE_KEY, state);
  sessionStorage.setItem(PKCE_REMEMBER_KEY, params.rememberMe ? 'true' : 'false');

  const url = new URL(`${issuer}/protocol/openid-connect/auth`);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid profile email');
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('code_challenge', challenge);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('state', state);
  if (params.email) {
    url.searchParams.set('login_hint', params.email);
  }

  window.location.assign(url.toString());
}

export async function handleKeycloakCallback(): Promise<AuthStorage> {
  const { issuer, clientId, redirectUri } = getAuthConfig();
  const params = new URLSearchParams(window.location.search);
  const error = params.get('error');
  if (error) {
    throw new Error(params.get('error_description') || error);
  }

  const code = params.get('code');
  const state = params.get('state');
  const expectedState = sessionStorage.getItem(PKCE_STATE_KEY);
  const verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
  const rememberMe = sessionStorage.getItem(PKCE_REMEMBER_KEY) === 'true';

  if (!code || !state || !expectedState || state !== expectedState || !verifier) {
    throw new Error('Invalid login session. Please try again.');
  }

  const tokenResponse = await fetch(
    `${issuer}/protocol/openid-connect/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      }),
    },
  );

  if (!tokenResponse.ok) {
    throw new Error('Failed to exchange authorization code.');
  }

  const tokenData: {
    access_token: string;
    refresh_token?: string;
    id_token?: string;
    expires_in: number;
  } = await tokenResponse.json();

  const auth: AuthStorage = {
    accessToken: tokenData.access_token,
    refreshToken: tokenData.refresh_token,
    idToken: tokenData.id_token,
    expiresAt: Date.now() + tokenData.expires_in * 1000,
  };

  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));

  sessionStorage.removeItem(PKCE_STATE_KEY);
  sessionStorage.removeItem(PKCE_VERIFIER_KEY);
  sessionStorage.removeItem(PKCE_REMEMBER_KEY);

  return auth;
}

export function getStoredAuth(): AuthStorage | null {
  const fromSession = sessionStorage.getItem(AUTH_STORAGE_KEY);
  const fromLocal = localStorage.getItem(AUTH_STORAGE_KEY);
  const raw = fromSession || fromLocal;
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthStorage;
  } catch {
    return null;
  }
}
