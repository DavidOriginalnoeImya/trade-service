import React, {useEffect} from 'react';
import {Menu, MenuItem, ProSidebar, SidebarHeader, SubMenu} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import {useKeycloak} from "@react-keycloak/web";
import SidebarMenu from "./SidebarMenu";
import {observer} from "mobx-react-lite";
import sidebarStore from "./store/SidebarStore";
import "./Sidebar.css"

const Sidebar = () => {
    const { keycloak } = useKeycloak();

    useEffect(() => {
        sidebarStore.getUserFunctions(keycloak.token)
    },[keycloak.token])

    return (
        <ProSidebar>
            <SidebarHeader className="sidebar-header">
                Система фирменной торговли
            </SidebarHeader>
            <Menu>
                <SidebarMenu sidebarMenuData={ sidebarStore.userFunctions }/>
            </Menu>
        </ProSidebar>
    );
};

export default observer(Sidebar);