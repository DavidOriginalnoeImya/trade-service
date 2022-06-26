import axios from "axios";
import {Product} from "../components/form/ProductSaleForm";

export type StorageProductAcceptDTO = {
    name: string,
    price: number,
    city: string,
    productQuantity: number,
}

export type ShopProductAcceptDTO = {
    name: string,
    price: number,
    city: string,
    productQuantity: number,
    shopAddress: string;
}

export class RequestService {
    public static async getStorageAvailableCertificate(products: string[], authToken: string | undefined) {
        try {
            return await axios.post("http://localhost:8080/api/storekeeper/certificate/create",
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

    public static async getShopAvailableCertificate(products: string[], shopAddress: string, authToken: string | undefined) {
        try {
            return await axios.post("http://localhost:8080/api/storeworker/certificate/create",
                JSON.stringify({products: products, shopAddress: shopAddress}),
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

    public static async getShopAddresses(authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storeworker/shop/addresses",
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    },
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении адресов магазинов с сервера")
        }
    }

    public static async getStorageProducts(authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storekeeper/storage/products",
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    },
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении товаров склада с сервера")
        }
    }

    public static async getProductCities(productName: string, authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storekeeper/storage/city/" + productName,
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    },
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении городов товара с сервера")
        }
    }

    public static async getProductPrices(productName: string, productCity: string, authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storekeeper/storage/price?name=" + productName +
                "&city=" + productCity,
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    },
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении городов товара с сервера")
        }
    }

    public static async acceptProductToStorage(product: StorageProductAcceptDTO, authToken: string | undefined) {
        try {
            await axios.post("http://localhost:8080/api/storekeeper/product/accept",
                JSON.stringify(product),
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    },
                }
            );
        }
        catch (e) {
            console.warn("Ошибка приема товара")
        }
    }

    public static async acceptProductToShop(product: ShopProductAcceptDTO, authToken: string | undefined) {
        try {
            await axios.post("http://localhost:8080/api/storeworker/product/accept",
                JSON.stringify(product),
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    },
                }
            );
        }
        catch (e) {
            console.warn("Ошибка приема товара")
        }
    }
}