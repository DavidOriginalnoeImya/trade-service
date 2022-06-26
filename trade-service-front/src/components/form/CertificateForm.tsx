import React, {FC, useEffect, useState} from 'react';
import {Button, Col, Container, Form, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import './Form.css';
import {MdOutlineClose} from "react-icons/md";
import {RequestService} from "../../utils/RequestService";
import {useKeycloak} from "@react-keycloak/web";
import List from "../List";
import fileDownload from "js-file-download";

interface ICertificateForm {
    role: "storeworker" | "storekeeper";
}

const CertificateForm: FC<ICertificateForm> = ({role}) => {
    const [productName, setProductName] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([] as string[]);
    const [selectedShopAddress, setSelectedShopAddress] = useState("Все магазины")
    const [shopAddresses, setShopAddresses] = useState(["Все магазины"] as string[]);

    const { keycloak } = useKeycloak();

    useEffect(() => {
        RequestService.getShopAddresses(keycloak.token)
            .then((response) => {
                if (response !== undefined && Array.isArray(response.data)) {
                    setShopAddresses([...shopAddresses, ...response.data]);
                }
            })
    }, [keycloak.token]);

    const addButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (productName.length > 0 && !selectedProducts.includes(productName)) {
            setSelectedProducts([...selectedProducts, productName]);
            setProductName("");
        }
        else {
            alert("Введите название товара")
        }
    }

    const deleteButtonClicked = (productName: string) => {
        setSelectedProducts(selectedProducts.filter(name => productName !== name))
    }

    const createStorageCertificateClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (selectedProducts.length > 0) {
            const fileDownload = require('js-file-download');

            RequestService.getStorageAvailableCertificate(selectedProducts, keycloak.token)
                .then((response) => {
                    if (response !== undefined)
                        fileDownload(response.data, "Справка.docx");
                });
        }
        else {
            alert("Список запрашиваемых товаров пуст")
        }
    }

    const createShopCertificateClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (selectedProducts.length > 0) {
            const fileDownload = require('js-file-download');

            RequestService.getShopAvailableCertificate(selectedProducts, selectedShopAddress, keycloak.token)
                .then((response) => {
                    if (response !== undefined)
                        fileDownload(response.data, "Справка.docx");
                });
        }
        else {
            alert("Список запрашиваемых товаров пуст")
        }
    }

    const createOptionList = (items: string[] | number[]) => {
        return items.map((item, index) => (
            <option key={index}> { item } </option>
        ))
    }

    return (
        <div className="form-container">
            <Container className="m-lg-2 mt-2">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label> {"Название товара"} </Form.Label>
                        <div className="select-block">
                            <Form.Control className="mt-4 product-input"
                                          value={productName}
                                          onChange={event => setProductName(event.target.value)}
                            />

                            <Form.Control
                                className="mt-4 add-button"
                                type="submit"
                                value="Добавить"
                                onClick={addButtonClicked}
                            />
                        </div>

                        { (role === "storeworker") &&
                            <Col className="form-input">
                                <Form.Label> {"Адрес магазина"} </Form.Label>
                                <Form.Select
                                    value={selectedShopAddress}
                                    onChange={event => setSelectedShopAddress(event.target.value)}
                                >
                                    { createOptionList(shopAddresses) }
                                </Form.Select>
                            </Col>
                        }

                        <Form.Control
                            className="mt-4 form-input"
                            type="submit"
                            value="Сформировать справку"
                            onClick={role === "storekeeper" ?
                                createStorageCertificateClicked : createShopCertificateClicked}
                        />
                        <br/>
                        {(selectedProducts.length > 0 ?
                            "Список запрашиваемых товаров:" :
                            "Список запрашиваемых товаров пуст")}
                        <br/><br/>
                        <ListGroup className="list-group">
                            {
                                selectedProducts.map((product, index) => (
                                    <ListGroup.Item key={ index }>
                                        { product }
                                        <MdOutlineClose
                                            className="list-button"
                                            title="Удалить"
                                            onClick={() => deleteButtonClicked(product)}
                                        />
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
};

export default CertificateForm;