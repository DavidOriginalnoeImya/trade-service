package ru.home.dto;

import java.util.ArrayList;
import java.util.List;

public class ProductNamesDTO {
    private List<String> productNames = new ArrayList<>();

    public List<String> getProducts() {
        return productNames;
    }

    public ProductNamesDTO setProducts(List<String> productNames) {
        this.productNames = productNames;

        return this;
    }
}
