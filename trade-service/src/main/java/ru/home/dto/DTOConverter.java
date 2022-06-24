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
}
