package ru.home.rest;

import jdk.jfr.ContentType;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;
import ru.home.controller.StoreWorkerController;
import ru.home.dto.ProductsListDTO;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Path("/api/storeworker")
public class StoreWorkerREST {
    private static final Logger LOGGER = Logger.getLogger(StoreWorkerREST.class.getSimpleName());

    @Inject
    JsonWebToken jwt;

    @ConfigProperty(name = "document.available.certificate.name", defaultValue = "available-certificate.docx")
    String availableCertificateName;

    @Inject
    StoreWorkerController storeWorkerController;

    @POST
    @Path("/certificate/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response createAvailableCertificate(List<String> products) throws IOException {
        storeWorkerController.createAvailableCertificate(products);

        return Response
                .ok(Files.readAllBytes(java.nio.file.Path.of(availableCertificateName)))
                .header("Content-Disposition", "attachment; filename=\"Справка.docx\"")
                .build();
    }
}
