import React, {FormEvent, MouseEventHandler, useEffect, useState} from 'react';
import {Button, Col, Container, Form, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import './Form.css';
import {MdDelete, MdOutlineClose} from "react-icons/md";
import {RequestService} from "../../utils/RequestService";
import {useKeycloak} from "@react-keycloak/web";

const ShopCertificateForm = () => {
    const [productName, setProductName] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([] as string[]);

    const { keycloak } = useKeycloak();

    const addButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (productName.length > 0 && !selectedProducts.includes(productName)) {
            setSelectedProducts([...selectedProducts, productName]);
        }
    }

    const createCertificateClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const fileDownload = require('js-file-download');

        RequestService.getAvailableCertificate(selectedProducts, keycloak.token)
            .then((response) => {
                if (response !== undefined)
                    fileDownload(response.data, "Справка.docx");
            });
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
                        <br/>
                        <ListGroup className="list-group">
                            {
                                selectedProducts.map((product, index) => (
                                    <ListGroup.Item key={ index }>
                                        { product }
                                        <MdOutlineClose className="product-del-button" title="Удалить выбранное"/>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Form.Group>
                    <Form.Control
                        className="mt-4 create-cert-button"
                        type="submit"
                        value="Сформировать справку"
                        onClick={createCertificateClicked}
                    />
                </Form>
            </Container>
        </div>
    );
};

export default ShopCertificateForm;