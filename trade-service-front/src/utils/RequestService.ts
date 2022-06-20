import axios from "axios";
import {IRoleFunction} from "../components/sidebar/store/SidebarStore";

export class RequestService {
    public static async getAvailableCertificate(products: string[], authToken: string | undefined) {
        try {
            await axios.post("http://localhost:8080/api/storeworker/certificate/create",
                JSON.stringify(products),
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json"
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении сертификата с сервера")
        }
    }
}