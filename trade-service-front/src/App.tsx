import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import keycloakClient from "./utils/keycloak/keycloakClient";
import {useKeycloak} from "@react-keycloak/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    const { keycloak } = useKeycloak();

    return (
        <div className="App">
            <BrowserRouter>
                <Sidebar/>
            </BrowserRouter>
        </div>
    );
}

export default App;