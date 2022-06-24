package ru.home.controller;

import ru.home.model.Product;
import ru.home.util.DocumentCreator;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class ShopWorkerController {



    @Inject
    DocumentCreator documentCreator;

    public byte[] createAvailableCertificate(List<Product> products) {
        return documentCreator.writeCertificate(products);
    }

    public byte[] createCheck(List<Product> products) {
        return documentCreator.writeCheck(products);
    }
}
