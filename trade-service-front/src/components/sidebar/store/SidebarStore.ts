import { makeAutoObservable } from "mobx";
import axios from "axios";

export interface IRoleFunction {
    functionName: string;
    functionUri: string;
}

class SidebarStore {
    serverUrl = "http://localhost:8080"

    userFunctions: IRoleFunction[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public getUserFunctions(authToken: string | undefined): IRoleFunction[] {
        this.getUserFunctionsFromServer(authToken);
        return this.userFunctions;
    }

    public setUserFunctions(userFunctions: IRoleFunction[]) {
        this.userFunctions = userFunctions;
    }

    private async getUserFunctionsFromServer(authToken: string | undefined) {
        try {
            const {data} = await axios.get<IRoleFunction>(this.serverUrl + "/api/user/functions",
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
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

const sidebarStore = new SidebarStore();

export default sidebarStore;