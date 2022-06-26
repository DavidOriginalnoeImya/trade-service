import React, {FC, useEffect, useState} from 'react';
import {Col, Container, Form, ToastContainer} from "react-bootstrap";
import './Form.css';
import {RequestService} from "../../utils/RequestService";
import {useKeycloak} from "@react-keycloak/web";

interface IProductAcceptForm {
    role: "storeworker" | "storekeeper";
}

const ProductAcceptForm: FC<IProductAcceptForm> = ({ role }) => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCity, setProductCity] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [shopAddress, setShopAddress] = useState("");

    const [shopAddresses, setShopAddresses] = useState([] as string[]);
    const [storageProducts, setStorageProducts] = useState([] as string[]);
    const [productCities, setProductCities] = useState([] as string[]);
    const [productPrices, setProductPrices] = useState([] as number[]);

    const { keycloak } = useKeycloak();

    useEffect(() => {
        RequestService.getShopAddresses(keycloak.token)
            .then((response) => {
                if (response !== undefined && Array.isArray(response.data)) {
                    setShopAddresses(response.data);
                    setShopAddress(response.data.length > 0 ? response.data[0] : "");
                }
            })

        RequestService.getStorageProducts(keycloak.token)
            .then((response) => {
                if (response !== undefined && Array.isArray(response.data)) {
                    setStorageProducts(response.data);
                    setProductName(response.data.length > 0 ? response.data[0] : "");
                }
            })
    }, [keycloak.token]);

    useEffect(() => {
        RequestService.getProductCities(productName, keycloak.token)
            .then((response) => {
                if (response !== undefined && Array.isArray(response.data)) {
                    setProductCities(response.data);
                    setProductCity(response.data.length > 0 ? response.data[0] : "");
                }
            })
    }, [productName])

    useEffect(() => {
        RequestService.getProductPrices(productName, productCity, keycloak.token)
            .then((response) => {
                if (response !== undefined && Array.isArray(response.data)) {
                    setProductPrices(response.data);
                    setProductPrice(response.data.length > 0 ? response.data[0] : "");
                }
            })
    }, [productName, productCity])

    const createOptionList = (items: string[] | number[]) => {
        return items.map((item, index) => (
            <option key={index}> { item } </option>
        ))
    }

    const storageAcceptButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (productQuantity) {
            RequestService.acceptProductToStorage({
                    name: productName,
                    city: productCity,
                    price: parseFloat(productPrice),
                    productQuantity: parseInt(productQuantity)
                }, keycloak.token);

            setProductQuantity("");
        }
        else {
            alert("Все поля должны быть заполнены")
        }
    }

    const shopAcceptButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (productQuantity) {
            RequestService.acceptProductToShop({
                name: productName,
                city: productCity,
                price: parseFloat(productPrice),
                productQuantity: parseInt(productQuantity),
                shopAddress: shopAddress
            }, keycloak.token);

            setProductQuantity("");
        }
        else {
            alert("Все поля должны быть заполнены")
        }
    }

    return (
        <div className="form-container">
            <Container className="m-lg-2 mt-2">
                <Form>
                    <Form.Group className="mb-3">

                        {
                            (role === "storeworker") &&
                            <Col className="form-input">
                                <Form.Label> {"Адрес магазина"} </Form.Label>
                                <Form.Select value={shopAddress} onChange={(e) => setShopAddress(e.target.value)}>
                                    { createOptionList(shopAddresses) }
                                </Form.Select>
                            </Col>
                        }

                        <Col className="form-input">
                            <Form.Label> {"Название товара"} </Form.Label>
                            <Form.Select value={productName} onChange={(e) => setProductName(e.target.value)}>
                                { createOptionList(storageProducts) }
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
                            <Form.Select value={productPrice} onChange={event => setProductPrice(event.target.value)}>
                                { createOptionList(productPrices) }
                            </Form.Select>
                        </Col>
                        <Col className="form-input">
                            <Form.Label> {"Количество"} </Form.Label>
                            <Form.Control value={productQuantity} onChange={event => setProductQuantity(event.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Col style={{width: "450px", maxWidth: "450px"}}>
                        <Form.Control
                            className="mt-4"
                            type="submit"
                            value="Принять товар"
                            onClick={role === "storekeeper" ? storageAcceptButtonClicked : shopAcceptButtonClicked}
                        />
                    </Col>
                </Form>
            </Container>
            <ToastContainer />
        </div>
    )
};

export default ProductAcceptForm;