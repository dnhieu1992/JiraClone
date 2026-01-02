type PublicEnv = {
  keycloakUrl: string;
  keycloakRealm: string;
  keycloakClientId: string;
  appUrl: string;
};

function requireEnv(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing required env: ${key}`);
  }
  return value;
}

export function getPublicEnv(): PublicEnv {
  return {
    keycloakUrl: requireEnv(
      process.env.NEXT_PUBLIC_KEYCLOAK_URL,
      'NEXT_PUBLIC_KEYCLOAK_URL',
    ),
    keycloakRealm: requireEnv(
      process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
      'NEXT_PUBLIC_KEYCLOAK_REALM',
    ),
    keycloakClientId: requireEnv(
      process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
      'NEXT_PUBLIC_KEYCLOAK_CLIENT_ID',
    ),
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  };
}
