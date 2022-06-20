package ru.home.rest;

import jdk.jfr.ContentType;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;
import ru.home.controller.StoreWorkerController;
import ru.home.dto.ProductsListDTO;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/storeworker")
public class StoreWorkerREST {
    private static final Logger LOGGER = Logger.getLogger(StoreWorkerREST.class.getSimpleName());

    @Inject
    JsonWebToken jwt;

    @Inject
    StoreWorkerController storeWorkerController;

    @POST
    @Path("/certificate/create")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createAvailableCertificate(@Context HttpHeaders headers, List<String> products) {//ProductsListDTO products) {
        LOGGER.info(products == null);

        storeWorkerController.createAvailableCertificate(products);
    }
}
