import React, {FC} from 'react';
import {roleFunction} from "./store/SidebarStore";
import {Link} from "react-router-dom";
import {MenuItem} from "react-pro-sidebar";

export interface ISidebarMenu {
    sidebarMenuData: roleFunction[];
}

const SidebarMenu: FC<ISidebarMenu> = ({sidebarMenuData}) => {
    return (
        <>
            {
                sidebarMenuData.map((roleFunction) => (
                    <MenuItem>
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