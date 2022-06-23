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

function App() {
    const { keycloak } = useKeycloak();

    const shopFormCheckButtonClicked = (selectedProducts: Product[]) => {
        const fileDownload = require('js-file-download');

        RequestService.getCheck(selectedProducts, keycloak.token)
            .then((response) => {
                if (response !== undefined)
                    fileDownload(response.data, "Товарный чек.docx");
            });
    }

    const shopFormOrderButtonClicked = (selectedProducts: Product[]) => {
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Sidebar/>
                <Routes>
                    <Route
                        path="/shop/order/active"
                        element={<ShopActiveOrderForm key="ShopForm0" />}
                    />
                    <Route
                        path="/shop/product/acceptance"
                        element={<ProductAcceptForm key="ShopForm1" />}
                    />
                    <Route
                        path="/shop/product/sale"
                        element={
                            <ShopProductSaleForm
                                key="ShopForm2"
                                addButtonName="Добавить товар в чек"
                                formButtonName="Сформировать чек"
                                containsLabelName="Содержимое чека:"
                                formButtonAction={shopFormCheckButtonClicked}
                            />
                        }
                    />
                    <Route
                        path="/shop/product/order"
                        element={
                            <ShopProductSaleForm
                                key="ShopForm3"
                                addButtonName="Добавить товар в заказ"
                                formButtonName="Отправить заказ на склад"
                                containsLabelName="Содержимое заказа:"
                                formButtonAction={shopFormCheckButtonClicked}
                            />
                        }
                    />
                    <Route
                        path="/shop/product/certificate"
                        element={<CertificateForm key="ShopForm4" shopsCheckBox={ true }/>}
                    />
                    <Route
                        path="/storage/order/active"
                        element={<StoreActiveOrderForm key="StoreForm1" />}
                    />
                    <Route
                        path="/storage/product/acceptance"
                        element={<ProductAcceptForm key="StoreForm2" />}
                    />
                    <Route
                        path="/storage/product/release"
                        element={
                            <ShopProductSaleForm
                                key="StoreForm3"
                                addButtonName="Добавить товар"
                                formButtonName="Сформировать накладную"
                                containsLabelName="Содержимое накладной:"
                                formButtonAction={shopFormCheckButtonClicked}
                            />
                        }
                    />
                    <Route
                        path="/storage/product/certificate"
                        element={<CertificateForm key="StoreForm4" shopsCheckBox={ false }/>}
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