import React, {FC, useEffect, useState} from 'react';
import List from "../List";
import {useKeycloak} from "@react-keycloak/web";
import {RequestService} from "../../utils/RequestService";

interface IStoreActiveOrderForm {
    setOrderId: (orderId: string) => void;
}

const StoreActiveOrderForm: FC<IStoreActiveOrderForm> = ({ setOrderId }) => {
    const [activeOrders, setActiveOrders] = useState([] as string[]);

    const { keycloak } = useKeycloak();

    useEffect(() => {
        RequestService.getActiveOrders(keycloak.token)
            .then((response) => {
                if (response !== undefined && Array.isArray(response.data)) {
                    setActiveOrders(response.data);
                }
            })
    }, [keycloak.token]);

    return (
        <div>
            <div style={{marginTop: "3%", marginLeft: "3%"}}>
                Список активных заказов
            </div>
            <div>
                <List
                    items={ activeOrders }
                    setOrderId={setOrderId}
                />
            </div>
        </div>
    );
};

export default StoreActiveOrderForm;