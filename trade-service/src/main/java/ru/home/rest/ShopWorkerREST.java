package ru.home.rest;

import org.jboss.logging.Logger;
import ru.home.controller.ShopWorkerController;
import ru.home.dto.*;
import ru.home.model.Product;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/api/storeworker")
public class ShopWorkerREST {
    private static final Logger LOGGER = Logger.getLogger(ShopWorkerREST.class.getSimpleName());

    @Inject
    ShopWorkerController shopWorkerController;

    @POST
    @Path("/product/accept")
    @Consumes(MediaType.APPLICATION_JSON)
    public void acceptProduct(ShopProductAcceptDTO shopProductAcceptDTO) {
        shopWorkerController.addProduct(DTOConverter.getProductFromProductAcceptDTO(shopProductAcceptDTO),
                shopProductAcceptDTO.getShopAddress());
    }

    @POST
    @Path("/certificate/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response createAvailableCertificate(ShopAvailableCertificateDTO availableCertificateDTO) {
        return Response
                .ok(shopWorkerController.createAvailableCertificate(availableCertificateDTO))
                .header("Content-Disposition", "attachment; filename=\"Справка.docx\"")
                .build();
    }

    @POST
    @Path("/check/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response createCheck(@QueryParam("address") String shopAddress, List<Product> products) {
        return Response
                .ok(shopWorkerController.createCheck(products))
                .header("Content-Disposition", "attachment; filename=\"Чек.docx\"")
                .build();
    }

    @GET
    @Path("/shop/addresses")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getShopAddresses() {
        return Response
                .ok(shopWorkerController.getShopAddresses())
                .build();
    }

    @GET
    @Path("/shop/products")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getShopProducts(@QueryParam("address") String shopAddress) {
        return Response
                .ok(shopWorkerController.getProductsFromShop(shopAddress))
                .build();
    }

    @GET
    @Path("/shop/city")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getShopProducts(@QueryParam("address") String shopAddress,
                                    @QueryParam("name") String productName) {
        return Response
                .ok(shopWorkerController.getProductCitiesFromShop(shopAddress, productName))
                .build();
    }

    @GET
    @Path("/shop/price")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getShopProducts(@QueryParam("address") String shopAddress,
                                    @QueryParam("name") String productName,
                                    @QueryParam("city") String productCity) {
        return Response
                .ok(shopWorkerController.getProductPricesFromShop(shopAddress, productName, productCity))
                .build();
    }

    @GET
    @Path("/shop/quantity")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getShopProducts(@QueryParam("address") String shopAddress,
                                    @QueryParam("name") String productName,
                                    @QueryParam("city") String productCity,
                                    @QueryParam("price") String productPrice) {
        return Response
                .ok(shopWorkerController.getProductQuantityFromShop(shopAddress, productName, productCity, productPrice))
                .build();
    }

    @GET
    @Path("/product/quantity")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getRequiredNumberForProduct(@QueryParam("address") String shopAddress,
                                                @QueryParam("name") String productName,
                                                @QueryParam("city") String productCity,
                                                @QueryParam("price") String productPrice) {
        return Response
                .ok(shopWorkerController.getRequiredNumberForProduct(new Product()
                        .setName(productName).setCity(productCity).setPrice(Float.parseFloat(productPrice)), shopAddress))
                .build();
    }

    @POST
    @Path("/order/create")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addOrder(@QueryParam("address") String shopAddress, List<Product> products) {
        shopWorkerController.addOrder(products, shopAddress);
    }

}
