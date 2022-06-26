import React, {FC, useState} from 'react';
import {MdOutlineClose} from "react-icons/md";
import {Table} from "react-bootstrap";
import {Product} from "./form/ProductSaleForm";

interface IProductTable {
    products: Product[];
    setProducts: (products: Product[]) => void;
}

const ProductTable: FC<IProductTable> = ({ products, setProducts}) => {
    const deleteButtonClicked = (productIndex: number) => {
        setProducts(products.filter((product, index) => productIndex !== index))
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th style={{width:"40px", maxWidth:"40px", textAlign:"center"}}>№</th>
                <th className="table-column">Название товара</th>
                <th className="table-column">Город производства</th>
                <th className="table-column">Количество</th>
                <th className="table-column">Стоимость</th>
                <th className="table-column">Удалить</th>
            </tr>
            </thead>
            <tbody>
            {
                products.length > 0 ? products.map((product, index) => (
                        <tr key={index}>
                            <th style={{width:"40px", maxWidth:"40px", textAlign:"center"}}>{ index + 1 }</th>
                            <th className="table-column">{ product.name }</th>
                            <th className="table-column">{ product.city }</th>
                            <th className="table-column">{ product.quantity }</th>
                            <th className="table-column">{ product.price }</th>
                            <th className="table-column">
                                <MdOutlineClose
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
    );
};

export default ProductTable;