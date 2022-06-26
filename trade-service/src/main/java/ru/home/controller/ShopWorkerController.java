package ru.home.controller;

import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;
import ru.home.dto.ProductNamesDTO;
import ru.home.dto.ShopAvailableCertificateDTO;
import ru.home.dto.ShopProductAcceptDTO;
import ru.home.model.Product;
import ru.home.util.DocumentCreator;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ShopWorkerController {
    private static final Logger LOGGER = Logger.getLogger(ShopWorkerController.class.getSimpleName());

    @Inject
    JsonWebToken jwt;

    @Inject
    DbController dbController;

    @Inject
    DocumentCreator documentCreator;

    public byte[] createAvailableCertificate(ShopAvailableCertificateDTO availableCertificateDTO) {
        List<Product> products = new ArrayList<>();

        for (String productName: availableCertificateDTO.getProducts()) {
            RowSet<Row> rows;

            if ("Все магазины".equals(availableCertificateDTO.getShopAddress())) {
                rows = dbController.getProductsQuantityFromShops(productName);
            }
            else {
                rows = dbController.getProductsQuantityFromShops(productName, availableCertificateDTO.getShopAddress());
            }

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

        String certificateTitle = "";

        if ("Все магазины".equals(availableCertificateDTO.getShopAddress())) {
            certificateTitle = "о наличии товара во всех магазинах сети";
        }
        else {
            certificateTitle = "о наличии товара в магазине по адресу: " + availableCertificateDTO.getShopAddress();
        }

        return documentCreator.writeCertificate(products,certificateTitle,
                jwt != null ? jwt.getClaim("family_name") + " " + jwt.getClaim("given_name") : "");
    }

    public byte[] createCheck(List<Product> products) {
        return documentCreator.writeCheck(products);
    }

    public void addProduct(Product product, String shopAddress) {
        int productId = dbController.getProductId(product);

        LOGGER.info("productid: " + productId);

        if (productId != -1) {
            int shopId = dbController.getShopId(shopAddress);

            LOGGER.info("shopId: " + shopId);

            if (shopId != -1) {
                RowSet<Row> rows = dbController.getProductFromShop(shopId, productId);

                if (rows.rowCount() > 0) {
                    LOGGER.info("update");
                    dbController.updateProductInShop(shopId, productId, Integer.parseInt(product.getQuantity()));
                }
                else {
                    LOGGER.info("insert");
                    dbController.addNewProductToShop(shopId, productId, Integer.parseInt(product.getQuantity()));
                }
            }
        }
    }

    public List<String> getShopAddresses() {
        List<String> addresses = new ArrayList<>();

        RowSet<Row> rows = dbController.getShopAddresses();

        for (Row row: rows) {
            addresses.add(row.getString("address"));
        }

        return addresses;
    }


}
