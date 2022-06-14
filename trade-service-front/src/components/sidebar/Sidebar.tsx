import React from 'react';
import {Menu, MenuItem, ProSidebar, SidebarHeader, SubMenu} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import {useKeycloak} from "@react-keycloak/web";
import styles from "./Sidebar.module.less";
import { Link } from "react-router-dom";
import sideBarStore from "./store/SidebarStore";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
    const { userFunctions } = sideBarStore;

    return (
        <ProSidebar className={styles.sidebar}>
            <SidebarHeader className={styles.sidebarHeader}>
                <div className={styles.headerContent}> Система фирменной торговли </div>
            </SidebarHeader>
            <Menu>
                <SidebarMenu sidebarMenuData={ userFunctions }/>
            </Menu>
        </ProSidebar>
    );
};

export default Sidebar;