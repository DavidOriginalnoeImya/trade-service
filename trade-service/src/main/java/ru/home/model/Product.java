package ru.home.model;

public class Product {
    private String name;
    private String city;

    private float price;

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

    public float getPrice() {
        return price;
    }

    public Product setPrice(float price) {
        this.price = price;

        return this;
    }
}
