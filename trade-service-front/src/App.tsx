import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import keycloakClient from "./utils/keycloak/keycloakClient";
import {useKeycloak} from "@react-keycloak/web";

function App() {
    const { keycloak } = useKeycloak();

    return (
        <div className="App">
            <Sidebar/>
        </div>
    );
}

export default App;