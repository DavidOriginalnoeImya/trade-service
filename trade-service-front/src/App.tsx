import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import keycloakClient from "./utils/keycloak/keycloakClient";
import {useKeycloak} from "@react-keycloak/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreOrderForm from "./components/form/StoreOrderForm";
import CertificateForm from "./components/form/CertificateForm";
import ShopProductSaleForm, {Product} from "./components/form/ProductSaleForm";
import ProductAcceptForm from "./components/form/ProductAcceptForm";
import {RequestService} from "./utils/RequestService";
import fileDownload from "js-file-download";
import ShopActiveOrderForm from "./components/form/ShopActiveOrderForm";
import StoreActiveOrderForm from "./components/form/StoreActiveOrderForm";
import OrderSendForm from "./components/form/OrderSendForm";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Sidebar/>
                <Routes>
                    <Route
                        path="/shop/product/acceptance"
                        element={
                            <ProductAcceptForm
                                key="ShopForm1"
                                role="storeworker"
                            />
                        }
                    />
                    <Route
                        path="/shop/product/sale"
                        element={
                            <ShopProductSaleForm key="ShopForm2" />
                        }
                    />
                    <Route
                        path="/shop/product/order"
                        element={
                            <ShopProductSaleForm key="ShopForm3" />
                        }
                    />
                    <Route
                        path="/shop/product/certificate"
                        element={
                        <CertificateForm
                            key="ShopForm4"
                            role="storeworker"
                        />}
                    />
                    <Route
                        path="/storage/order/active"
                        element={<StoreActiveOrderForm key="StoreForm1" />}
                    />
                    <Route
                        path="/storage/product/acceptance"
                        element={
                            <ProductAcceptForm
                                key="StoreForm2"
                                role="storekeeper"
                            />
                        }
                    />
                    <Route
                        path="/storage/product/release"
                        element={
                            <OrderSendForm key="StoreForm3" />
                        }
                    />
                    <Route
                        path="/storage/product/certificate"
                        element={
                        <CertificateForm
                            key="StoreForm4"
                            role="storekeeper"
                        />}
                    />
                    <Route
                        path="/storage/order"
                        element={<StoreOrderForm key="StoreForm5" />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;