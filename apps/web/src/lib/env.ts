type PublicEnv = {
  keycloakUrl: string;
  keycloakRealm: string;
  keycloakClientId: string;
  appUrl: string;
};

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env: ${key}`);
  }
  return value;
}

export function getPublicEnv(): PublicEnv {
  return {
    keycloakUrl: getRequiredEnv('NEXT_PUBLIC_KEYCLOAK_URL'),
    keycloakRealm: getRequiredEnv('NEXT_PUBLIC_KEYCLOAK_REALM'),
    keycloakClientId: getRequiredEnv('NEXT_PUBLIC_KEYCLOAK_CLIENT_ID'),
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  };
}
