type KeycloakConfig = {
  authServerUrl: string | undefined;
  realm: string | undefined;
  apiClientId: string | undefined;
  apiClientSecret: string | undefined;
  adminClientId: string | undefined;
  adminClientSecret: string | undefined;
};

type AppConfig = {
  keycloak: KeycloakConfig;
};

// Map environment variables to configuration object
export default (): AppConfig => ({
  keycloak: {
    authServerUrl: process.env.KEYCLOAK_AUTH_URL,
    realm: process.env.KEYCLOAK_REALM,
    apiClientId: process.env.KEYCLOAK_API_CLIENT_ID,
    apiClientSecret: process.env.KEYCLOAK_API_CLIENT_SECRET,
    adminClientId: process.env.KEYCLOAK_ADMIN_CLIENT_ID,
    adminClientSecret: process.env.KEYCLOAK_ADMIN_CLIENT_SECRET,
  },
});
