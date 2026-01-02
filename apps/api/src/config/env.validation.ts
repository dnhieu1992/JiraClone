const REQUIRED_ENV = [
  'KEYCLOAK_AUTH_URL',
  'KEYCLOAK_REALM',
  'KEYCLOAK_API_CLIENT_ID',
  'KEYCLOAK_ADMIN_CLIENT_ID',
  'KEYCLOAK_ADMIN_CLIENT_SECRET',
];

type EnvVars = Record<string, unknown>;

export function validateEnv(config: EnvVars): EnvVars {
  const missing = REQUIRED_ENV.filter((key) => {
    const value = config[key];
    return typeof value !== 'string' || value.trim().length === 0;
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }

  return config;
}
