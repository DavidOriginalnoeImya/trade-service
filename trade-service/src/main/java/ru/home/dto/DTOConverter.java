package ru.home.dto;

import ru.home.model.Product;

import java.util.ArrayList;
import java.util.List;

public class DTOConverter {
    public static List<Product> getProductsFromProductName(ProductNamesDTO productNames) {
        List<Product> products = new ArrayList<>();

        for (String productName: productNames.getProducts()) {
            products.add(new Product().setName(productName).setCity("").setPrice(0));
        }

        return products;
    }

    public static Product getProductFromProductAcceptDTO(StorageProductAcceptDTO storageProductAcceptDTO) {
        return new Product()
                .setName(storageProductAcceptDTO.getName())
                .setCity(storageProductAcceptDTO.getCity())
                .setPrice(storageProductAcceptDTO.getPrice())
                .setQuantity(String.valueOf(storageProductAcceptDTO.getProductQuantity()));
    }

    public static Product getProductFromProductAcceptDTO(ShopProductAcceptDTO shopProductAcceptDTO) {
        return new Product()
                .setName(shopProductAcceptDTO.getName())
                .setCity(shopProductAcceptDTO.getCity())
                .setPrice(shopProductAcceptDTO.getPrice())
                .setQuantity(String.valueOf(shopProductAcceptDTO.getProductQuantity()));
    }
}
