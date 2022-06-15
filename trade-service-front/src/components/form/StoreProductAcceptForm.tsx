import React, {useState} from 'react';
import {Col, Container, Form, ToastContainer} from "react-bootstrap";
import './Form.css';

const StoreProductAcceptForm = () => {
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productCity, setProductCity] = useState("")

    return (
        <div className="form-container">
            <Container className="m-lg-2 mt-2">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label> {"Название товара"} </Form.Label>
                        <Col sm="3">
                            <Form.Control value={productName} onChange={event => setProductName(event.target.value)}/>
                        </Col>
                        <Form.Label> {"Стоимость"} </Form.Label>
                        <Col sm="3">
                            <Form.Control value={productPrice} onChange={event => setProductPrice(event.target.value)}/>
                        </Col>
                        <Form.Label> {"Город производства"} </Form.Label>
                        <Col sm="3">
                            <Form.Control value={productCity} onChange={event => setProductCity(event.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Col sm="3">
                        <Form.Control className="mt-4" type="submit" value="Принять товар"/>
                    </Col>
                </Form>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default StoreProductAcceptForm;