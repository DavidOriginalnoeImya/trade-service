import React, {useState} from 'react';
import {Col, Container, Form, ToastContainer} from "react-bootstrap";
import './Form.css';

const StoreProductAcceptForm = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCity, setProductCity] = useState("");
    const [productQuantity, setProductQuantity] = useState("");

    const acceptButtonClicked = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (productName && productPrice && productCity && productQuantity) {
            setProductName("");
            setProductPrice("");
            setProductCity("");
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
                        <Col className="form-input">
                            <Form.Label> {"Название товара"} </Form.Label>
                            <Form.Control value={productName} onChange={event => setProductName(event.target.value)}/>
                        </Col>
                        <Col className="form-input">
                            <Form.Label> {"Количество"} </Form.Label>
                            <Form.Control value={productQuantity} onChange={event => setProductQuantity(event.target.value)}/>
                        </Col>
                        <Col className="form-input">
                            <Form.Label> {"Стоимость"} </Form.Label>
                            <Form.Control value={productPrice} onChange={event => setProductPrice(event.target.value)}/>
                        </Col>
                        <Col className="form-input">
                            <Form.Label> {"Город производства"} </Form.Label>
                            <Form.Control value={productCity} onChange={event => setProductCity(event.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Col style={{width: "450px", maxWidth: "450px"}}>
                        <Form.Control
                            className="mt-4"
                            type="submit"
                            value="Принять товар"
                            onClick={acceptButtonClicked}
                        />
                    </Col>
                </Form>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default StoreProductAcceptForm;