package ru.home.model;

public class Product {
    private String name;
    private String city;

    private int quantity;

    public String getName() {
        return name;
    }

    public Product setName(String name) {
        this.name = name;

        return this;
    }

    public String getCity() {
        return city;
    }

    public Product setCity(String city) {
        this.city = city;

        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public Product setQuantity(int quantity) {
        this.quantity = quantity;

        return this;
    }




}
