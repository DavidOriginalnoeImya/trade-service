package ru.home.rest;

import ru.home.controller.StoreKeeperController;
import ru.home.dto.StoreProductAcceptDTO;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("/api/storekeeper")
public class StoreKeeperREST {

    @Inject
    StoreKeeperController storeKeeperController;

    @POST
    @Path("/product/accept")
    @Consumes(MediaType.APPLICATION_JSON)
    public void acceptProduct(StoreProductAcceptDTO productAcceptDTO) {
        storeKeeperController.addProduct(productAcceptDTO.getProduct(), productAcceptDTO.getProductQuantity());
    }
}
