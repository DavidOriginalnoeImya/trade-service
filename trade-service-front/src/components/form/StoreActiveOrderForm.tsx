import React from 'react';
import List from "../List";

const StoreActiveOrderForm = () => {
    return (
        <div>
            <div style={{marginTop: "3%", marginLeft: "3%"}}>
                Список активных заказов
            </div>
            <div>
                <List
                    items={["Заказ 1", "Заказ2"]}
                    variant="transition"
                />
            </div>
        </div>
    );
};

export default StoreActiveOrderForm;