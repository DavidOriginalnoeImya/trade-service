import React, {FC} from 'react';
import {IRoleFunction} from "./store/SidebarStore";
import {Link} from "react-router-dom";
import {MenuItem} from "react-pro-sidebar";

export interface ISidebarMenu {
    sidebarMenuData: IRoleFunction[];
}

const SidebarMenu: FC<ISidebarMenu> = ({sidebarMenuData}) => {
    return (
        <>
            {
                sidebarMenuData.map((roleFunction, index) => (
                    <MenuItem key={index}>
                        <Link to={ roleFunction.functionUri }>
                            { roleFunction.functionName }
                        </Link>
                    </MenuItem>
                ))
            }
        </>
    );
};

export default SidebarMenu;