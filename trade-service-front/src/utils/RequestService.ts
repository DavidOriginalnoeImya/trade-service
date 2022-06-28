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

    public static async getInvoice(products: Product[], authToken: string | undefined) {
        try {
            return await axios.post("http://localhost:8080/api/storekeeper/invoice/create",
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
            console.warn("Ошибка при получении накладной с сервера")
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

    public static async addOrder(products: Product[], shopAddress: string, authToken: string | undefined) {
        console.log("http://localhost:8080/api/storeworker/order/create?address="
            + shopAddress.replace(" ", "+"));

        try {
            return await axios.post("http://localhost:8080/api/storeworker/order/create?address="
                + shopAddress.replace(" ", "+"),
                JSON.stringify(products),
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при создании нового заказа")
        }
    }

    public static async getShopProducts(shopAddress: string, authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storeworker/shop/products?address="
                + shopAddress.replace(" ", "+"),
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении товаров магазина с сервера")
        }
    }

    public static async getActiveOrders(authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storekeeper/order/active",
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении списка активных заказов с сервера")
        }
    }

    public static async getOrderProducts(orderId: string, authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storekeeper/order/products?id=" + orderId,
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении списка товаров с сервера")
        }
    }

    public static async getOrderShopAddress(orderId: string, authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storekeeper/order/shop?id=" + orderId,
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении адреса заказа с сервера")
        }
    }

    public static async closeOrder(orderId: string, authToken: string | undefined) {
        try {
            return await axios.post("http://localhost:8080/api/storekeeper/order/close?id=" + orderId,
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при закрытии заказа")
        }
    }

    public static async getProductCitiesFromShop(shopAddress: string, productName: string, authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storeworker/shop/city?address="
                + shopAddress.replace(" ", "+") + "&name=" +
                productName.replace(" ", "+"),
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении адресов магазинов с сервера")
        }
    }

    public static async getProductRequiredQuantity(shopAddress: string, productName: string,
                                                   productCity: string, productPrice: string,
                                                   authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storeworker/product/quantity?address="
                + shopAddress.replace(" ", "+") + "&name=" +
                productName.replace(" ", "+") + "&city=" +
                productCity.replace(" ", "+") + "&price=" + productPrice
                ,
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении данных с сервера")
        }
    }

    public static async getProductPricesFromShop(shopAddress: string, productName: string,
                                                 productCity: string, authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storeworker/shop/price?address="
                + shopAddress.replace(" ", "+") + "&name=" +
                productName.replace(" ", "+") + "&city=" +
                productCity.replace(" ", "+"),
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении адресов магазинов с сервера")
        }
    }

    public static async getProductQuantityFromShop(shopAddress: string, productName: string,
                                                    productCity: string, productPrice: string,
                                                    authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storeworker/shop/quantity?address="
                + shopAddress.replace(" ", "+") + "&name=" +
                productName.replace(" ", "+") + "&city=" +
                productCity.replace(" ", "+") + "&price=" + productPrice
                ,
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
                }
            );
        }
        catch (e) {
            console.warn("Ошибка при получении адресов магазинов с сервера")
        }
    }

    public static async getProductQuantityFromStorage(productName: string, productCity: string, productPrice: string,
                                                   authToken: string | undefined) {
        try {
            return await axios.get("http://localhost:8080/api/storekeeper/storage/quantity?name="
                + productName.replace(" ", "+") + "&city=" +
                productCity.replace(" ", "+") + "&price=" + productPrice
                ,
                {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "content-type": "application/json",
                    }
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

    public static async getProductCitiesFromStorage(productName: string, authToken: string | undefined) {
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

    public static async getProductPricesFromStorage(productName: string, productCity: string,
                                                    authToken: string | undefined) {
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
            console.warn("Ошибка при получении цены товара с сервера")
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