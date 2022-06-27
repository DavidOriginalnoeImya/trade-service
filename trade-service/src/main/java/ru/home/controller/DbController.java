package ru.home.controller;

import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;
import org.jboss.logging.Logger;
import ru.home.model.Product;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class DbController {
    private static final Logger LOGGER = Logger.getLogger(DbController.class.getSimpleName());

    private static String newOrderStatus = "new";

    @Inject
    PgPool client;

    public void updateSlotProductQuantity(int slotId, int productQuantity) {
        client.preparedQuery("UPDATE Storage SET productquantity = $1 + productquantity WHERE slotid = $2")
                .execute(Tuple.of(productQuantity, slotId))
                .await().indefinitely();
    }

    public int getProductId(Product product) {
        RowSet<Row> rows = client.preparedQuery("SELECT productid FROM Product " +
                        "WHERE name = $1 AND city = $2 AND ABS(price - $3) <= 0.001")
                .execute(Tuple.of(product.getName(), product.getCity(), product.getPrice()))
                .await().indefinitely();

        if (rows.rowCount() > 0) {
            return rows.iterator().next().getInteger("productid");
        }

        return -1;
    }

    public int getAdmSlotId(int productId, int productQuantity) {
        RowSet<Row> rows = client.preparedQuery("SELECT slotid FROM Storage " +
                        "WHERE productid = $1 AND capacity - productQuantity >= $2")
                .execute(Tuple.of(productId, productQuantity))
                .await().indefinitely();

        if (rows.rowCount() > 0) {
            return rows.iterator().next().getInteger("slotid");
        }

        return -1;
    }

    public RowSet<Row> getProductsQuantityFromStorage(String productName) {
        return client.preparedQuery("SELECT productid, SUM(productquantity) AS sum FROM storage " +
                "WHERE productid IN (SELECT productid FROM product WHERE name = $1) " +
                "GROUP BY productid").execute(Tuple.of(productName)).await().indefinitely();
    }

    public int getShopId(String shopAddress) {
        RowSet<Row> rows = client.preparedQuery("SELECT shopid FROM shop WHERE address = $1")
                .execute(Tuple.of(shopAddress)).await().indefinitely();

        if (rows.rowCount() > 0) {
            return rows.iterator().next().getInteger("shopid");
        }

        return -1;
    }

    public RowSet<Row> getShopAddresses() {
        return client.query("SELECT address FROM shop").execute().await().indefinitely();
    }

    public void addNewProductToShop(int shopId, int productId, int productQuantity) {
        client.preparedQuery("INSERT INTO Availability (shopid, productid, productquantity)  VALUES ($1, $2, $3)")
                .execute(Tuple.of(shopId, productId, productQuantity))
                .await().indefinitely();
    }

    public void updateProductInShop(int shopId, int productId, int productQuantity) {
        client.preparedQuery("UPDATE Availability SET productquantity = productquantity + $1 " +
                        "WHERE shopid = $2 AND productid = $3")
                .execute(Tuple.of(productQuantity, shopId, productId))
                .await().indefinitely();
    }


    public RowSet<Row> getProductsFromStorage() {
        return client.query("SELECT name FROM product WHERE productid IN " +
                "(SELECT productid FROM storage GROUP BY productid) GROUP BY name").execute().await().indefinitely();
    }

    public RowSet<Row> getProductCities(String productName) {
        return client.preparedQuery("SELECT product.city FROM product, storage " +
                        "WHERE product.productid = storage.productid AND product.name = $1 " +
                        "GROUP BY product.city")
                .execute(Tuple.of(productName)).await().indefinitely();
    }

    public RowSet<Row> getProductPrices(String productName, String productCity) {
        return client.preparedQuery("SELECT product.price FROM product, storage " +
                        "WHERE product.productid = storage.productid AND product.name = $1 AND product.city = $2 " +
                        "GROUP BY product.price")
                .execute(Tuple.of(productName, productCity)).await().indefinitely();
    }

    public RowSet<Row> getProductFromShop(int shopId, int productId) {
        return client.preparedQuery("SELECT * FROM Availability WHERE shopid = $1 AND productid = $2")
                .execute(Tuple.of(shopId, productId)).await().indefinitely();
    }

    public RowSet<Row> getProductsQuantityFromShops(String productName) {
        return client.preparedQuery("SELECT productid, SUM(productquantity) AS sum FROM Availability " +
                "WHERE productid IN (SELECT productid FROM product WHERE name = $1) " +
                "GROUP BY productid").execute(Tuple.of(productName)).await().indefinitely();
    }

    public RowSet<Row> getProductsQuantityFromShops(String productName, String shopAddress) {
        return client.preparedQuery("SELECT productid, productquantity AS sum FROM Availability " +
                "WHERE productid IN (SELECT productid FROM product WHERE name = $1) " +
                "AND shopid = (SELECT shopid FROM Shop WHERE address = $2)")
                .execute(Tuple.of(productName, shopAddress)).await().indefinitely();
    }

    public RowSet<Row> getProductsFromShop(String shopAddress) {
        return client.preparedQuery("SELECT name FROM product WHERE productid IN " +
                        "(SELECT productid FROM Availability  WHERE shopid = " +
                        "(SELECT shopid FROM Shop WHERE address = $1)) " +
                        "GROUP BY name")
                .execute(Tuple.of(shopAddress)).await().indefinitely();
    }

    public RowSet<Row> getProductCitiesFromShop(String shopAddress, String productName) {
        return client.preparedQuery("SELECT city FROM product WHERE productid IN " +
                        "(SELECT productid FROM Availability  WHERE shopid = " +
                        "(SELECT shopid FROM Shop WHERE address = $1)) AND name = $2 " +
                        "GROUP BY city")
                .execute(Tuple.of(shopAddress, productName)).await().indefinitely();
    }

    public RowSet<Row> getProductPricesFromShop(String shopAddress, String productName, String city) {
        return client.preparedQuery("SELECT price FROM product WHERE productid IN " +
                        "(SELECT productid FROM Availability  WHERE shopid = " +
                        "(SELECT shopid FROM Shop WHERE address = $1)) AND name = $2 AND city = $3")
                .execute(Tuple.of(shopAddress, productName, city)).await().indefinitely();
    }

    public RowSet<Row> getProductQuantityFromShop(String shopAddress, String productName, String city, String price) {
        return client.preparedQuery("SELECT productquantity FROM availability " +
                        "WHERE productid = (SELECT productid FROM product " +
                        "WHERE name = $1 AND city = $2 AND ABS(price - $3) <= 0.01) " +
                        "AND shopid = (SELECT shopid FROM shop WHERE address = $4)")
                .execute(Tuple.of(productName, city, Float.parseFloat(price), shopAddress)).await().indefinitely();
    }

    public RowSet<Row> getProductQuantityFromStorage(String productName, String city, String price) {
        return client.preparedQuery("SELECT SUM(productquantity) AS sum FROM storage " +
                        "WHERE productid = (SELECT productid FROM product " +
                        "WHERE name = $1 AND city = $2 AND ABS(price - $3) <= 0.01) " +
                        "GROUP BY productid")
                .execute(Tuple.of(productName, city, Float.parseFloat(price))).await().indefinitely();
    }

    public void updateStorageSlots(List<Product> products) {
        for (Product product: products) {
            client.preparedQuery("UPDATE storage SET productquantity = productquantity - $1 " +
                    "WHERE slotid = (SELECT slotid FROM storage WHERE productid = " +
                    "(SELECT productid from product WHERE name = $2 AND city = $3 " +
                    "AND ABS(price - $4) <= 0.01) AND productquantity - $5 >= 0 LIMIT 1)")
                    .execute(Tuple.of(Integer.parseInt(product.getQuantity()), product.getName(),
                            product.getCity(), product.getPrice(), Integer.parseInt(product.getQuantity())))
                    .await().indefinitely();
        }
    }

    public void updateShopProducts(Product product) {
        client.preparedQuery("UPDATE availability SET productquantity = productquantity - $1 " +
                        "WHERE productid = (SELECT productid from product WHERE name = $2 AND city = $3 " +
                        "AND ABS(price - $4) <= 0.01) AND productquantity - $5 >= 0")
                .execute(Tuple.of(Integer.parseInt(product.getQuantity()), product.getName(),
                        product.getCity(), product.getPrice(), Integer.parseInt(product.getQuantity())))
                .await().indefinitely();
    }

    public int getLastOrderId() {
        RowSet<Row> rows = client.query("SELECT MAX(orderid) AS max FROM productorder")
                .execute().await().indefinitely();

        if (rows.rowCount() > 0) {
            Integer lastOrderId = rows.iterator().next().getInteger("max");

            return (lastOrderId != null) ? lastOrderId : 0;
        }

        return -1;
    }

    public void createNewOrder(int orderId, String shopAddress) {
        if (orderId >= 0) {
            client.preparedQuery("INSERT INTO productorder (orderid, shopid, status) " +
                            "VALUES ($1, (SELECT shopid FROM shop WHERE address = $2), $3)")
                    .execute(Tuple.of(orderId, shopAddress, newOrderStatus)).await().indefinitely();
        }
    }

    public void addProductToOrder(int orderId, int productId, int productQuantity) {
        client.preparedQuery("INSERT INTO includes (orderid, productid, productquantity) VALUES ($1, $2, $3)")
                .execute(Tuple.of(orderId, productId, productQuantity)).await().indefinitely();
    }

    public RowSet<Row> getActiveOrdersId() {
        return client.preparedQuery("SELECT orderid FROM productorder WHERE status = $1")
                .execute(Tuple.of(newOrderStatus)).await().indefinitely();
    }
}
