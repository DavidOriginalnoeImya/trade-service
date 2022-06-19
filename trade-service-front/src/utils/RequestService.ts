import axios from "axios";
import {IRoleFunction} from "../components/sidebar/store/SidebarStore";

export class RequestService {
    public static async getAvailableCertificate(products: string[], authToken: string | undefined) {
        console.log(JSON.stringify({products: products}))

        try {
            await axios.post("http://localhost:8080/api/storeworker/certificate/create",
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({products: products})
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении сертификата с сервера")
        }
    }
}