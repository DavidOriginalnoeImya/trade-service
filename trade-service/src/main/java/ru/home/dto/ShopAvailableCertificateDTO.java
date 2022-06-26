package ru.home.dto;

import java.util.ArrayList;
import java.util.List;

public class ShopAvailableCertificateDTO {
    private List<String> productNames = new ArrayList<>();

    public String getShopAddress() {
        return shopAddress;
    }

    public void setShopAddress(String shopAddress) {
        this.shopAddress = shopAddress;
    }

    private String shopAddress;

    public List<String> getProducts() {
        return productNames;
    }

    public ShopAvailableCertificateDTO setProducts(List<String> productNames) {
        this.productNames = productNames;

        return this;
    }

    public List<String> getProductNames() {
        return productNames;
    }

    public ShopAvailableCertificateDTO setProductNames(List<String> productNames) {
        this.productNames = productNames;

        return this;
    }
}
