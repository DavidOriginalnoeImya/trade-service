import { makeAutoObservable } from "mobx";
import {MenuItem} from "react-pro-sidebar";
import React from "react";
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";
import Keycloak from "keycloak-js";

export interface roleFunction {
    functionName: string;
    functionUri: string;
}

class SidebarStore {
    serverUrl = "http://localhost:8080"

    userFunctions: roleFunction[] = [];

    constructor(keycloak: Keycloak) {
        //makeAutoObservable(this);
        this.getUserFunctionsFromServer(keycloak);
    }

    public getUserFunctions(): roleFunction[] {
        return this.userFunctions;
    }

    public setUserFunctions(userFunctions: roleFunction[]) {
        this.userFunctions = userFunctions;
    }

    private async getUserFunctionsFromServer(keycloak: Keycloak) {
        try {
            const {data} = await axios.get(this.serverUrl + "/api/user/functions",
                {
                    headers: {
                        "Authorization": "Bearer " + keycloak.token,
                    }
                }
            );

            if (Array.isArray(data)) {
                this.setUserFunctions(data);
            }
        }
        catch (e) {
            console.warn("Ошибка при получении функций пользователя с сервера")
        }
    }
}

export default SidebarStore;