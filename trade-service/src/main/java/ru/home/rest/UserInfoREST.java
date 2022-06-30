package ru.home.rest;

import io.quarkus.security.identity.SecurityIdentity;
import org.jboss.logging.Logger;
import ru.home.dto.UserFunctionDTO;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/api/user")
public class UserInfoREST {
    private static final Logger LOGGER = Logger.getLogger(UserInfoREST.class.getSimpleName());

    private static final List<UserFunctionDTO> shopWorkerFunctions = List.of(
            new UserFunctionDTO().setFunctionName("Прием товара в магазин").setFunctionUri("/shop/product/acceptance"),
            new UserFunctionDTO().setFunctionName("Заказ товара со склада").setFunctionUri("/shop/product/order"),
            new UserFunctionDTO().setFunctionName("Получение справки о товаре").setFunctionUri("/shop/product/certificate")
    );

    private static final List<UserFunctionDTO> salesmanFunctions = List.of(
            new UserFunctionDTO().setFunctionName("Продажа товара").setFunctionUri("/shop/product/sale")
    );

    private static final List<UserFunctionDTO> storeKeeperFunctions = List.of(
            new UserFunctionDTO().setFunctionName("Список активных заказов").setFunctionUri("/storage/order/active"),
            new UserFunctionDTO().setFunctionName("Прием товара на склад").setFunctionUri("/storage/product/acceptance"),
            new UserFunctionDTO().setFunctionName("Отпуск товара в магазин").setFunctionUri("/storage/product/release"),
            new UserFunctionDTO().setFunctionName("Получение справки о товаре").setFunctionUri("/storage/product/certificate")
    );

//    @Inject
//    JsonWebToken jwt;

    @Inject
    SecurityIdentity securityIdentity;

    @GET
    @Path("/functions")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserFunctionByRole() {
        if (securityIdentity.hasRole("storeworker")) {
            return Response.ok(shopWorkerFunctions).build();
        }
        else if (securityIdentity.hasRole("storekeeper")) {
            return Response.ok(storeKeeperFunctions).build();
        }
        else if (securityIdentity.hasRole("salesman")) {
            return Response.ok(salesmanFunctions).build();
        }
        else return Response.status(425, "Unknown role").build();
    }
}
