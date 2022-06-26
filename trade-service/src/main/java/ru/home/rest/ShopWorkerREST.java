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
    public Response createCheck(List<Product> products) {
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
}
