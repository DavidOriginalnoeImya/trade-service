import React, {useState} from 'react';
import {Col, Table} from "react-bootstrap";
import {MdOutlineClose} from "react-icons/md";
import {Product} from "./ProductSaleForm";

const StoreOrderForm = () => {
    const [orderedProducts, setOrderedProducts] = useState([] as Product[])

    return (
        <Col className="product-table">
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th style={{width:"40px", maxWidth:"40px", textAlign:"center"}}>№</th>
                    <th className="table-column">Название товара</th>
                    <th className="table-column">Город производства</th>
                    <th className="table-column">Требуемое количество</th>
                    <th className="table-column">Количество на складе</th>
                </tr>
                </thead>
                <tbody>
                {
                    orderedProducts.length > 0 ? orderedProducts.map((product, index) => (
                            <tr key={index}>
                                <th style={{width:"40px", maxWidth:"40px", textAlign:"center"}}>{ index + 1 }</th>
                                <th className="table-column">{ product.name }</th>
                                <th className="table-column">{ product.city }</th>
                                <th className="table-column">{ product.quantity }</th>
                                <th className="table-column">{ 10 }</th>
                            </tr>
                        )) :
                        <tr>
                            <td style={{textAlign: "center"}} colSpan={5}>Список пуст</td>
                        </tr>
                }
                </tbody>
            </Table>
        </Col>
    );
};

export default StoreOrderForm;