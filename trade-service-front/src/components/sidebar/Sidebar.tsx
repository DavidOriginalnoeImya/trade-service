import React from 'react';
import {Nav} from "react-bootstrap";
import {Menu, MenuItem, ProSidebar, SidebarHeader, SubMenu} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import {useKeycloak} from "@react-keycloak/web";

const Sidebar = () => {
    const {keycloak} = useKeycloak();

    return (
        <ProSidebar>
            <SidebarHeader>Система фирменной торговли</SidebarHeader>
            <Menu iconShape="square">

                {
                    keycloak.hasRealmRole("storekeeper") &&
                    <>
                        <MenuItem>Прием товара на склад</MenuItem>
                        <MenuItem>Отпуск товара в магазин</MenuItem>
                        <MenuItem>Получение справки о товаре</MenuItem>
                    </>
                }
                {
                    keycloak.hasRealmRole("storeworker") &&
                    <>
                        <MenuItem>Прием товара в магазин</MenuItem>
                        <MenuItem>Продажа товара</MenuItem>
                        <MenuItem>Заказ товара со склада</MenuItem>
                        <MenuItem>Получение справки о товаре</MenuItem>
                    </>
                }
            </Menu>
        </ProSidebar>
    );
};

export default Sidebar;