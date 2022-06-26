package ru.home.controller;

import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;
import org.jboss.logging.Logger;
import ru.home.model.Product;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class DbController {
    private static final Logger LOGGER = Logger.getLogger(DbController.class.getSimpleName());

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
        return client.preparedQuery("SELECT city FROM product WHERE name = $1")
                .execute(Tuple.of(productName)).await().indefinitely();
    }

    public RowSet<Row> getProductPrices(String productName, String productCity) {
        return client.preparedQuery("SELECT price FROM product WHERE name = $1 AND city = $2")
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
        return client.preparedQuery("SELECT productid, SUM(productquantity) AS sum FROM Availability " +
                "WHERE productid IN (SELECT productid FROM product WHERE name = $1) " +
                "AND shopid = (SELECT shopid FROM Shop WHERE address = $2)" +
                "GROUP BY productid").execute(Tuple.of(productName, shopAddress)).await().indefinitely();
    }
}
