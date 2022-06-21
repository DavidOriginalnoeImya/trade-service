import React, {useState} from 'react';
import {Col, Container, Dropdown, DropdownButton, Form, Table, ToastContainer} from "react-bootstrap";
import '../Form.css';
// @ts-ignore
import * as NumericInput from "react-numeric-input";

type Product = {
    name: string;
    city: string;
    quantity: string;
}

const StoreProductAcceptForm = () => {
    const [productName, setProductName] = useState("Тест");
    const [productCity, setProductCity] = useState("Тест");
    const [productQuantity, setProductQuantity] = useState("Тест");
    const [selectedProducts, setSelectedProducts] = useState([] as Product[]);

    const addButtonCLicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setSelectedProducts([...selectedProducts, {name: productName, city: productCity, quantity: productQuantity}]);
    }

    return (
        <div className="form-container">
            <Container className="m-lg-2 mt-2">
                <Form>
                    <Form.Group>
                        <Col className="form-input">
                            <Form.Label> {"Название товара"} </Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                        <Col className="form-input">
                            <Form.Label> {"Город производства"} </Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                        <Col style={{marginTop: "5px"}}>
                            <Form.Label> {"Количество"} </Form.Label>
                            <div>
                                <NumericInput
                                    min={1} max={100} value={1}
                                    style={{input: { height: "38px", width: "135px" }}}
                                />
                                <Form.Label style={{marginTop: "5px", marginLeft: "45px"}}>
                                    { "Доступное количество: 20 шт." }
                                </Form.Label>
                            </div>
                        </Col>
                    </Form.Group>
                    <Col className="form-input">
                        <Form.Control className="mt-4" onClick={addButtonCLicked} type="submit" value="Сформировать чек"/>
                    </Col>

                    <Col className="product-table">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Название товара</th>
                                    <th>Город производства</th>
                                    <th>Количество</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedProducts.length > 0 ? selectedProducts.map((product, index) => (
                                        <tr>
                                            <th>{ index + 1 }</th>
                                            <th>{ product.name }</th>
                                            <th>{ product.city }</th>
                                            <th>{ product.quantity }</th>
                                        </tr>
                                    )) :
                                        <tr>
                                            <td style={{textAlign: "center"}} colSpan={4}>Список товаров пуст</td>
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

export default StoreProductAcceptForm;