import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StorageActiveOrderForm from "./components/form/StorageActiveOrderForm";
import CertificateForm from "./components/form/CertificateForm";
import ShopProductSaleForm, {Product} from "./components/form/ProductSaleForm";
import ProductAcceptForm from "./components/form/ProductAcceptForm";
import StoreActiveOrderForm from "./components/form/StoreActiveOrderForm";
import OrderSendForm from "./components/form/StorageCreateOrderForm";
import ShopOrderForm from "./components/form/ShopOrderForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        console.log(orderId)
    }, [orderId])

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
                            <ShopOrderForm key="ShopForm3" />
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
                        element={<StoreActiveOrderForm key="StoreForm1" setOrderId={setOrderId}/>}
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
                        element={<StorageActiveOrderForm key="StoreForm5" orderId={orderId}/>}
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;