import Keycloak from 'keycloak-js';

const keycloakClient = new Keycloak({
    url: 'http://localhost:8180/auth',
    realm: 'trade',
    clientId: 'frontend',
});

export default keycloakClient;