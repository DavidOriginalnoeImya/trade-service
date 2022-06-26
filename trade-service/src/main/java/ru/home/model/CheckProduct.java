package ru.home.model;

import java.util.List;

public class CheckProduct {
    private String name;

    private String code;

    private String quantity;

    private String price;

    private String sum;

    public String getName() {
        return name;
    }

    public CheckProduct setName(String name) {
        this.name = name;

        return this;
    }

    public String getCode() {
        return code;
    }

    public CheckProduct setCode(String code) {
        this.code = code;

        return this;
    }

    public String getQuantity() {
        return quantity;
    }

    public CheckProduct setQuantity(String quantity) {
        this.quantity = quantity;

        return this;
    }

    public String getPrice() {
        return price;
    }

    public CheckProduct setPrice(String price) {
        this.price = price;

        return this;
    }

    public String getSum() {
        return sum;
    }

    public CheckProduct setSum(String sum) {
        this.sum = sum;

        return this;
    }
}
