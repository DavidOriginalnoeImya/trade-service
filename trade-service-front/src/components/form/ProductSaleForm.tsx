import React, {FC, useState} from 'react';
import {Col, Container, Dropdown, DropdownButton, Form, Table, ToastContainer} from "react-bootstrap";
import './Form.css';
// @ts-ignore
import * as NumericInput from "react-numeric-input";
import {MdOutlineClose} from "react-icons/md";
import {useKeycloak} from "@react-keycloak/web";
import {RequestService} from "../../utils/RequestService";
import fileDownload from "js-file-download";

export type Product = {
    name: string;
    city: string;
    quantity: number;
}

interface IProductSaleForm {
    addButtonName: string;
    formButtonName: string;
    containsLabelName: string;
    formButtonAction: (selectedProducts: Product[]) => void
}

const ProductSaleForm: FC<IProductSaleForm> = ({
                                                          addButtonName,
                                                          formButtonName,
                                                          containsLabelName,
                                                          formButtonAction
}) => {
    const [productName, setProductName] = useState("Товар1");
    const [productCity, setProductCity] = useState("Город1");
    const [productQuantity, setProductQuantity] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([] as Product[]);

    const createOptionList = (items: string[]) => {
        return items.map((item, index) => (
            <option key={index}> { item } </option>
        ))
    }

    const formCheckButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (selectedProducts.length > 0) {
            formButtonAction(selectedProducts);
        }
        else {
            alert("Список товаров пуст")
        }
    }

    const addButtonCLicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (productName && productCity && productQuantity > 0)
            setSelectedProducts([...selectedProducts, {name: productName, city: productCity, quantity: productQuantity}]);
        else if (productQuantity === 0)
            alert("Количество должно быть больше нуля")
    }

    const deleteButtonClicked = (productIndex: number) => {
        setSelectedProducts(selectedProducts.filter((product, index) => productIndex !== index))
    }

    return (
        <div className="form-container">
            <Container className="m-lg-2 mt-2">
                <Form>
                    <Form.Group>
                        <Col className="form-input">
                            <Form.Label> {"Название товара"} </Form.Label>
                            <Form.Select value={productName} onChange={(e) => setProductName(e.target.value)}>
                                { createOptionList(["Товар1", "Товар2", "Товар3"]) }
                            </Form.Select>
                        </Col>
                        <Col className="form-input">
                            <Form.Label> {"Город производства"} </Form.Label>
                            <Form.Select value={productCity} onChange={(e) => setProductCity(e.target.value)}>
                                { createOptionList(["Город1", "Город2", "Город3"]) }
                            </Form.Select>
                        </Col>
                        <Col style={{marginTop: "5px"}}>
                            <Form.Label> {"Количество"} </Form.Label>
                            <div>
                                <NumericInput
                                    min={1} max={100} value={productQuantity}
                                    onChange={(value: number) => setProductQuantity(value)}
                                    style={{input: { height: "38px", width: "135px" }}}
                                />
                                <Form.Label style={{marginTop: "5px", marginLeft: "45px"}}>
                                    { "Доступное количество: 20 шт." }
                                </Form.Label>
                            </div>
                        </Col>
                    </Form.Group>
                    <Col className="form-input">
                        <Form.Control
                            className="mt-4"
                            onClick={addButtonCLicked}
                            type="submit"
                            value={addButtonName}/>
                    </Col>
                    <Col style={{marginTop: "25px"}}>
                        <Form.Label style={{marginTop: "7px"}}> {containsLabelName} </Form.Label>
                        <Form.Control
                            className="create-check-button"
                            onClick={formCheckButtonClicked}
                            type="submit"
                            value={formButtonName}/>
                    </Col>
                    <Col className="product-table">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{width:"40px", maxWidth:"40px", textAlign:"center"}}>№</th>
                                    <th className="table-column">Название товара</th>
                                    <th className="table-column">Город производства</th>
                                    <th className="table-column">Количество</th>
                                    <th className="table-column">Удалить</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedProducts.length > 0 ? selectedProducts.map((product, index) => (
                                        <tr key={index}>
                                            <th style={{width:"40px", maxWidth:"40px", textAlign:"center"}}>{ index + 1 }</th>
                                            <th className="table-column">{ product.name }</th>
                                            <th className="table-column">{ product.city }</th>
                                            <th className="table-column">{ product.quantity }</th>
                                            <th className="table-column">
                                                <MdOutlineClose
                                                    style={{marginRight: "45%"}}
                                                    className="product-del-button"
                                                    onClick={() => deleteButtonClicked(index)}
                                                />
                                            </th>
                                        </tr>
                                    )) :
                                        <tr>
                                            <td style={{textAlign: "center"}} colSpan={5}>Список пуст</td>
                                        </tr>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Form>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default ProductSaleForm;