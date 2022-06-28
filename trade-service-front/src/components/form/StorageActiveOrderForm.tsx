import React, {FC, useEffect, useState} from 'react';
import {Col, Form, Table} from "react-bootstrap";
import {MdOutlineClose} from "react-icons/md";
import {Product} from "./ProductSaleForm";
import {useKeycloak} from "@react-keycloak/web";
import keycloakClient from "../../utils/keycloak/keycloakClient";
import {RequestService} from "../../utils/RequestService";
import { useNavigate } from "react-router-dom";

interface IStorageActiveOrderForm {
    orderId: string;
}

const StorageActiveOrderForm: FC<IStorageActiveOrderForm> = ({orderId}) => {
    const [orderProducts, setOrderProducts] = useState([] as Product[])

    const [shopAddress, setShopAddress] = useState("")

    const { keycloak } = useKeycloak();

    const navigate = useNavigate();

    useEffect(() => {
        if (orderId) {
            RequestService.getOrderProducts(orderId, keycloak.token)
                .then((response) => {
                    if (response !== undefined && Array.isArray(response.data)) {
                        setOrderProducts(response.data);
                    }
                })

            RequestService.getOrderShopAddress(orderId, keycloak.token)
                .then((response) => {
                    if (response !== undefined) {
                        setShopAddress(response.data);
                    }
                })
        }
    }, [keycloak.token]);

    const closeOrderButtonClicked = (event: React.FormEvent) => {
        event.preventDefault();

        RequestService.closeOrder(orderId, keycloak.token)
            .then(() => {   });

        navigate("/storage/order/active");
    }

    return (
        <Form style={{width: "75%"}}>
            <Form.Group>
                <Col style={{marginTop:"20px", marginLeft:"20px", width:"100%"}}>
                    <Form.Label> {"Заказ № " + orderId + ", адрес магазина: " + shopAddress} </Form.Label>
                    <Form.Control
                        className="close-order-button"
                        onClick={closeOrderButtonClicked}
                        type="submit"
                        value={"Закрыть заказ"}/>
                </Col>
                <Col className="order-product-table">
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th style={{width:"40px", maxWidth:"40px", textAlign:"center"}}>№</th>
                            <th className="table-column">Название товара</th>
                            <th className="table-column">Город производства</th>
                            <th className="table-column">Стоимость</th>
                            <th className="table-column">Требуемое количество</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            orderProducts.length > 0 ? orderProducts.map((product, index) => (
                                    <tr key={index}>
                                        <th style={{width:"40px", maxWidth:"40px", textAlign:"center"}}>{ index + 1 }</th>
                                        <th className="table-column">{ product.name }</th>
                                        <th className="table-column">{ product.city }</th>
                                        <th className="table-column">{ product.price }</th>
                                        <th className="table-column">{ product.quantity }</th>
                                    </tr>
                                )) :
                                <tr>
                                    <td style={{textAlign: "center"}} colSpan={5}>Список пуст</td>
                                </tr>
                        }
                        </tbody>
                    </Table>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default StorageActiveOrderForm;