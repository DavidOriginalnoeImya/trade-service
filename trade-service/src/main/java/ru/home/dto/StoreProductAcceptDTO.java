package ru.home.dto;

import ru.home.model.Product;

public class StoreProductAcceptDTO {
    private Product product;

    private int productQuantity;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }
}
