import axios from "axios";
import {Product} from "../components/form/shop/ShopProductSaleForm";

export class RequestService {
    public static async getAvailableCertificate(products: string[], authToken: string | undefined) {
        try {
            return await axios.post("http://localhost:8080/api/storeworker/certificate/create",
                JSON.stringify({products: products}),
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    },
                    responseType: 'blob'
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении сертификата с сервера")
        }
    }

    public static async getCheck(products: Product[], authToken: string | undefined) {
        try {
            return await axios.post("http://localhost:8080/api/storeworker/check/create",
                JSON.stringify(products),
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    },
                    responseType: 'blob'
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении чека с сервера")
        }
    }
}