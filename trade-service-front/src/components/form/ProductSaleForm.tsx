import React, {FC, useEffect, useState} from 'react';
import {Col, Container, Dropdown, DropdownButton, Form, Table, ToastContainer} from "react-bootstrap";
import './Form.css';
// @ts-ignore
import * as NumericInput from "react-numeric-input";
import {MdOutlineClose} from "react-icons/md";
import {useKeycloak} from "@react-keycloak/web";
import {RequestService} from "../../utils/RequestService";
import fileDownload from "js-file-download";
import ProductTable from "../ProductTable";

export type Product = {
    name: string;
    city: string;
    price: string;
    quantity: number;
}

const ProductSaleForm = () => {
    const [productName, setProductName] = useState("");
    const [productCity, setProductCity] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([] as Product[]);
    const [shopAddress, setShopAddress] = useState("");
    const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);


    const [shopAddresses, setShopAddresses] = useState([] as string[]);
    const [shopProducts, setShopProducts] = useState([] as string[]);
    const [productCities, setProductCities] = useState([] as string[]);
    const [productPrices, setProductPrices] = useState([] as number[]);

    const createOptionList = (items: string[] | number[]) => {
        return items.map((item, index) => (
            <option key={index}> { item } </option>
        ))
    }

    const { keycloak } = useKeycloak();

    useEffect(() => {
        RequestService.getShopAddresses(keycloak.token)
            .then((response) => {
                if (response !== undefined && Array.isArray(response.data)) {
                    setShopAddresses(response.data);
                    setShopAddress(response.data.length > 0 ? response.data[0] : "");
                }
            })
    }, [keycloak.token]);

    useEffect(() => {
        if (shopAddress) {
            RequestService.getShopProducts(shopAddress, keycloak.token)
                .then((response) => {
                    if (response !== undefined && Array.isArray(response.data)) {
                        setShopProducts(response.data);
                        setProductName(response.data.length > 0 ? response.data[0] : "");
                    }
                })
        }
    }, [shopAddress]);

    useEffect(() => {
        if (shopAddress && productName) {
            RequestService.getProductCitiesFromShop(shopAddress, productName, keycloak.token)
                .then((response) => {
                    if (response !== undefined && Array.isArray(response.data)) {
                        setProductCities(response.data);
                        setProductCity(response.data.length > 0 ? response.data[0] : "");
                    }
                })
        }
    }, [shopAddress, productName])

    useEffect(() => {
        if (shopAddress && productName && productCity) {
            RequestService.getProductPricesFromShop(shopAddress, productName, productCity, keycloak.token)
                .then((response) => {
                    if (response !== undefined && Array.isArray(response.data)) {
                        setProductPrices(response.data);
                        setProductPrice(response.data.length > 0 ? response.data[0] : "");
                    }
                })
        }
    }, [shopAddress, productName, productCity])

    useEffect(() => {
        if (shopAddress && productName && productCity && productPrice) {
            RequestService.getProductQuantityFromShop(shopAddress, productName, productCity, productPrice, keycloak.token)
                .then((response) => {
                    if (response !== undefined) {
                        setProductQuantity(response.data);
                    }
                })
        }
    }, [shopAddress, productName, productCity, productPrice])

    const formCheckButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const fileDownload = require('js-file-download');

        if (selectedProducts.length > 0) {
            RequestService.getCheck(selectedProducts, keycloak.token)
                .then((response) => {
                    if (response !== undefined)
                        fileDownload(response.data, "Товарный чек.docx");
                });
        }
        else {
            alert("Список товаров пуст")
        }

    }

    const addButtonCLicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (productName && productCity && selectedProductQuantity > 0) {
            const newProduct = { name: productName, city: productCity, quantity: selectedProductQuantity,
                price: productPrice } as Product

            if (!selectedProducts.find((product) => (product.name === newProduct.name &&
                product.city === newProduct.city && product.price === newProduct.price))) {
                setSelectedProducts([...selectedProducts, newProduct]);
            }
            else {
                alert("Товар уже есть в чеке!")
            }
        }
        else if (selectedProductQuantity === 0)
            alert("Количество должно быть больше нуля")
    }

    return (
        <div className="form-container">
            <Container className="m-lg-2 mt-2">
                <Form>
                    <Form.Group>
                        <Col className="form-input">
                            <Form.Label> {"Адрес магазина"} </Form.Label>
                            <Form.Select
                                value={shopAddress}
                                onChange={event => setShopAddress(event.target.value)}
                            >
                                { createOptionList(shopAddresses) }
                            </Form.Select>
                        </Col>
                        <Col className="form-input">
                            <Form.Label> {"Название товара"} </Form.Label>
                            <Form.Select value={productName} onChange={(e) => setProductName(e.target.value)}>
                                { createOptionList(shopProducts) }
                            </Form.Select>
                        </Col>
                        <Col className="form-input">
                            <Form.Label> {"Город производства"} </Form.Label>
                            <Form.Select value={productCity} onChange={(e) => setProductCity(e.target.value)}>
                                { createOptionList(productCities) }
                            </Form.Select>
                        </Col>
                        <Col className="form-input">
                            <Form.Label> {"Стоимость"} </Form.Label>
                            <Form.Select value={productPrice} onChange={(e) => setProductPrice(e.target.value)}>
                                { createOptionList(productPrices) }
                            </Form.Select>
                        </Col>
                        <Col style={{marginTop: "5px"}}>
                            <Form.Label> {"Количество"} </Form.Label>
                            <div>
                                <NumericInput
                                    min={0} max={productQuantity} value={selectedProductQuantity}
                                    onChange={(value: number) => setSelectedProductQuantity(value)}
                                    style={{input: { height: "38px", width: "135px" }}}
                                />
                                <Form.Label style={{marginTop: "5px", marginLeft: "45px"}}>
                                    { "Доступное количество: " + productQuantity + " шт." }
                                </Form.Label>
                            </div>
                        </Col>
                    </Form.Group>
                    <Col className="form-input">
                        <Form.Control
                            className="mt-4"
                            onClick={addButtonCLicked}
                            type="submit"
                            value={"Добавить товар в чек"}/>
                    </Col>
                    <Col style={{marginTop: "25px"}}>
                        <Form.Label style={{marginTop: "7px"}}> {"Содержимое чека:"} </Form.Label>
                        <Form.Control
                            className="create-check-button"
                            onClick={formCheckButtonClicked}
                            type="submit"
                            value={"Сформировать чек"}/>
                    </Col>
                    <Col className="product-table">
                        <ProductTable
                            products={selectedProducts}
                            setProducts={setSelectedProducts}
                        />
                    </Col>
                </Form>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default ProductSaleForm;