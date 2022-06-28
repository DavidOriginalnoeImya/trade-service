package ru.home.controller;

import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;
import ru.home.dto.ProductNamesDTO;
import ru.home.model.CheckProduct;
import ru.home.model.Product;
import ru.home.util.DocumentCreator;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class StoreKeeperController {
    private static final Logger LOGGER = Logger.getLogger(StoreKeeperController.class.getSimpleName());

    @Inject
    JsonWebToken jwt;

    @Inject
    DocumentCreator documentCreator;

    @Inject
    DbController dbController;

    public byte[] createAvailableCertificate(ProductNamesDTO productNames) {
        List<Product> products = new ArrayList<>();

        for (String productName: productNames.getProducts()) {
            RowSet<Row> rows = dbController.getProductsQuantityFromStorage(productName);

            if (rows.rowCount() > 0) {
                for (Row row : rows) {
                    products.add(new Product()
                            .setId(String.valueOf(row.getInteger("productid")))
                            .setName(productName)
                            .setQuantity(String.valueOf(row.getInteger("sum"))
                            ));
                }
            }
            else {
                products.add(new Product().setId("-").setName(productName).setQuantity("-"));
            }
        }

        return documentCreator.writeCertificate(products,"о наличии товара на складе",
                jwt != null ? jwt.getClaim("family_name") + " " + jwt.getClaim("given_name") : "");
    }

    public void addProduct(Product product) {
        int productId = dbController.getProductId(product);

        if (productId != -1) {
            int slotId = dbController.getAdmSlotId(productId, Integer.parseInt(product.getQuantity()));

            if (slotId != -1) {
                dbController.updateSlotProductQuantity(slotId, Integer.parseInt(product.getQuantity()));
            }
        }
    }


    public List<String> getProductsFromStorage() {
        List<String> products = new ArrayList<>();

        RowSet<Row> rows = dbController.getProductsFromStorage();

        for (Row row: rows) {
            products.add(row.getString("name"));
        }

        return products;
    }

    public List<String> getProductCities(String productName) {
        List<String> products = new ArrayList<>();

        RowSet<Row> rows = dbController.getProductCities(productName);

        for (Row row: rows) {
            products.add(row.getString("city"));
        }

        return products;
    }

    public byte[] createInvoice(List<Product> products) {
        dbController.updateStorageSlots(products);
        return documentCreator.writeInvoice(products);
    }

    public List<Float> getProductPrices(String productName, String productCity) {
        List<Float> products = new ArrayList<>();

        RowSet<Row> rows = dbController.getProductPrices(productName, productCity);

        for (Row row: rows) {
            products.add(row.getFloat("price"));
        }

        return products;
    }

    public int getProductQuantityFromStorage(String productName, String productCity, String productPrice) {
        RowSet<Row> rows = dbController.getProductQuantityFromStorage(productName, productCity, productPrice);

        if (rows.rowCount() > 0) {
            return rows.iterator().next().getInteger("sum");
        }

        return 0;
    }

    public List<String> getActiveOrdersId() {
        List<String> activeOrdersId = new ArrayList<>();

        for (Row row: dbController.getActiveOrdersId()) {
            activeOrdersId.add(String.valueOf(row.getInteger("orderid")));
        }

        return activeOrdersId;
    }

    public List<Product> getOrderProducts(int orderId) {
        List<Product> products = new ArrayList<>();

        RowSet<Row> productRows = dbController.getProductsForOrder(orderId);

        for (Row productRow: productRows) {
            products.add(new Product().setName(productRow.getString("name"))
                    .setPrice(productRow.getFloat("price"))
                    .setCity(productRow.getString("city"))
                    .setQuantity(String.valueOf(productRow.getInteger("productquantity"))));
        }

        return products;
    }

    public String getOrderShopAddress(int orderId) {
        return dbController.getOrderShopAddress(orderId);
    }

    public void closeOrder(int orderId) {
        dbController.closeOrder(orderId);
    }
}
