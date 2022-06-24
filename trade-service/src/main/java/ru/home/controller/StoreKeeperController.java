package ru.home.controller;

import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;
import ru.home.model.Product;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.logging.Logger;

@ApplicationScoped
public class StoreKeeperController {
    private static final Logger LOGGER = Logger.getLogger(StoreKeeperController.class.getSimpleName());

    @Inject
    PgPool client;

    public void addProduct(Product product, int productQuantity) {
        int productId = getProductId(product);

        if (productId != -1) {
            int slotId = getAdmSlotId(productId, productQuantity);

            if (slotId != -1) {
                client.preparedQuery("UPDATE Storage SET productquantity = $1 + productquantity WHERE slotid = $2")
                        .execute(Tuple.of(productQuantity, slotId))
                        .await().indefinitely();
            }
            else {
                addNewSlot(productId, productQuantity);
            }
        }
        else {
            addNewProduct(product);
            addNewSlot(getProductId(product), productQuantity);
        }
    }

    private int getProductId(Product product) {
        RowSet<Row> rows = client.preparedQuery("SELECT productid FROM Product " +
                "WHERE name = $1 AND city = $2 AND price = $3")
                .execute(Tuple.of(product.getName(), product.getCity(), product.getPrice()))
                .await().indefinitely();

        if (rows.rowCount() > 0) {
            return rows.iterator().next().getInteger("productid");
        }

        return -1;
    }

    private int getAdmSlotId(int productId, int productQuantity) {
        RowSet<Row> rows = client.preparedQuery("SELECT slotid FROM Storage " +
                        "WHERE productid = $1 AND capacity - productQuantity >= $2")
                .execute(Tuple.of(productId, productQuantity))
                .await().indefinitely();

        if (rows.rowCount() > 0) {
            return rows.iterator().next().getInteger("slotid");
        }

        return -1;
    }

    private void addNewSlot(int productId, int productQuantity) {
        client.preparedQuery("INSERT INTO Storage (capacity, productquantity, productid) " +
                "VALUES ($1, $2, $3)").execute(Tuple.of(productQuantity, productQuantity, productId))
                .await().indefinitely();
    }

    private void addNewProduct(Product product) {
        client.preparedQuery("INSERT INTO Product (name, city, price) " +
                "VALUES ($1, $2, $3)").execute(Tuple.of(product.getName(), product.getCity(), product.getPrice()))
                .await().indefinitely();
    }
}
