import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import keycloakClient from "./utils/keycloak/keycloakClient";
import {useKeycloak} from "@react-keycloak/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreProductAcceptForm from "./components/form/StoreProductAcceptForm";

function App() {
    const { keycloak } = useKeycloak();

    return (
        <div className="App">
            <BrowserRouter>
                <Sidebar/>
                <Routes>
                    <Route
                        path="/storage/product/acceptance"
                        element={<StoreProductAcceptForm />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;