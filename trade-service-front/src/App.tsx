import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import keycloakClient from "./utils/keycloak/keycloakClient";
import {useKeycloak} from "@react-keycloak/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreProductAcceptForm from "./components/form/store/StoreProductAcceptForm";
import StoreOrderForm from "./components/form/store/StoreOrderForm";
import ShopCertificateForm from "./components/form/shop/ShopCertificateForm";
import ShopProductAcceptForm from "./components/form/shop/ShopProductAcceptForm";
import ShopProductSaleForm from "./components/form/shop/ShopProductSaleForm";

function App() {
    const { keycloak } = useKeycloak();

    return (
        <div className="App">
            <BrowserRouter>
                <Sidebar/>
                <Routes>
                    <Route
                        path="/shop/product/acceptance"
                        element={<ShopProductAcceptForm />}
                    />
                    <Route
                        path="/shop/product/sale"
                        element={<ShopProductSaleForm />}
                    />
                    <Route
                        path="/shop/product/certificate"
                        element={<ShopCertificateForm />}
                    />
                    <Route
                        path="/storage/product/acceptance"
                        element={<StoreProductAcceptForm />}
                    />
                    <Route
                        path="/storage/order/active"
                        element={<StoreOrderForm />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;