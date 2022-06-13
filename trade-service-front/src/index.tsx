import { ReactKeycloakProvider } from '@react-keycloak/web';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import keycloakClient from "./utils/keycloak/keycloakClient";
import {AuthClientError, AuthClientEvent, AuthClientTokens} from "@react-keycloak/core/lib/types";

const eventLogger = (event: AuthClientEvent, error: AuthClientError | undefined) => {
    console.log('onKeycloakEvent', event, error)
}

const tokenLogger = (tokens: AuthClientTokens) => {
    console.log('onKeycloakTokens', tokens)
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ReactKeycloakProvider
        authClient={keycloakClient}
        initOptions={{ onLoad: 'login-required' }}
        onEvent={eventLogger}
        onTokens={tokenLogger}
    >
        <App />
    </ReactKeycloakProvider>
);