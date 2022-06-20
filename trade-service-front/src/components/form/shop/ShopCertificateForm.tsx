import React, {useState} from 'react';
import {Button, Col, Container, Form, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import '../Form.css';
import {MdDelete, MdOutlineClose} from "react-icons/md";
import {RequestService} from "../../../utils/RequestService";
import {useKeycloak} from "@react-keycloak/web";

const ShopCertificateForm = () => {
    const [productName, setProductName] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([] as string[]);

    const { keycloak } = useKeycloak();

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

    const createCertificateClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (productName.length > 0) {
            const fileDownload = require('js-file-download');

            RequestService.getAvailableCertificate(selectedProducts, keycloak.token)
                .then((response) => {
                    if (response !== undefined)
                        fileDownload(response.data, "Справка.docx");
                });
        }
        else {
            alert("Список запрашиваемых товаров пуст")
        }
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
                        <Form.Control
                            className="mt-4 form-input"
                            type="submit"
                            value="Сформировать справку"
                            onClick={createCertificateClicked}
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
                                            className="product-del-button"
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

export default ShopCertificateForm;