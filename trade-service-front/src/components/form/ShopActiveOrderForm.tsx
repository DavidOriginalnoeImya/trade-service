import React from 'react';
import List from "../List";

const ShopActiveOrderForm = () => {
    return (
        <div>
            <div style={{marginTop: "3%", marginLeft: "3%"}}>
                Список активных заказов
            </div>
            <div>
                <List
                    items={["Заказ 1", "Заказ2"]}
                    variant="waiting"
                />
            </div>
        </div>
    );
};

export default ShopActiveOrderForm;