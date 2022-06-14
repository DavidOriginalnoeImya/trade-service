import React, {useEffect} from 'react';
import {Menu, MenuItem, ProSidebar, SidebarHeader, SubMenu} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import {useKeycloak} from "@react-keycloak/web";
import styles from "./Sidebar.module.less";
import { Link } from "react-router-dom";
import sideBarStore from "./store/SidebarStore";
import SidebarMenu from "./SidebarMenu";
import {observer} from "mobx-react-lite";
import SidebarStore from "./store/SidebarStore";
import sidebarStore from "./store/SidebarStore";

const Sidebar = () => {
    const { keycloak } = useKeycloak();

    const sidebarStore = new SidebarStore(keycloak);

    return (
        <ProSidebar className={styles.sidebar}>
            <SidebarHeader className={styles.sidebarHeader}>
                <div className={styles.headerContent}> Система фирменной торговли </div>
            </SidebarHeader>
            <Menu>
                <SidebarMenu sidebarMenuData={ sidebarStore.getUserFunctions() }/>
            </Menu>
        </ProSidebar>
    );
};

export default Sidebar;