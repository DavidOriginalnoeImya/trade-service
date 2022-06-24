package ru.home.rest;

import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;
import ru.home.controller.ShopWorkerController;
import ru.home.dto.DTOConverter;
import ru.home.dto.ProductNamesDTO;
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
    JsonWebToken jwt;

    @Inject
    ShopWorkerController shopWorkerController;

    @POST
    @Path("/certificate/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response createAvailableCertificate(ProductNamesDTO productNames) {
        return Response
                .ok(shopWorkerController.createAvailableCertificate(DTOConverter.getProductsFromProductName(productNames)))
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
}
