package ru.home.rest;

import io.quarkus.oidc.IdToken;
import io.quarkus.security.identity.SecurityIdentity;
import org.eclipse.microprofile.jwt.JsonWebToken;
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

    private static final List<UserFunctionDTO> storeWorkerFunctions = List.of(
            new UserFunctionDTO().setFunctionName("Прием товара в магазин").setFunctionUri(" "),
            new UserFunctionDTO().setFunctionName("Продажа товара").setFunctionUri(" "),
            new UserFunctionDTO().setFunctionName("Заказ товара со склада").setFunctionUri(" "),
            new UserFunctionDTO().setFunctionName("Получение справки о товаре").setFunctionUri(" ")
    );

    private static final List<UserFunctionDTO> storeKeeperFunctions = List.of(
            new UserFunctionDTO().setFunctionName("Список активных заявок").setFunctionUri(" "),
            new UserFunctionDTO().setFunctionName("Прием товара на склад").setFunctionUri(" "),
            new UserFunctionDTO().setFunctionName("Отпуск товара в магазин").setFunctionUri(" "),
            new UserFunctionDTO().setFunctionName("Получение справки о товаре").setFunctionUri(" ")
    );

//    @Inject
//    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @GET
    @Path("/functions")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserFunctionByRole() {
        if (identity.hasRole("storeworker")) {
            return Response.ok(storeWorkerFunctions).build();
        }
        else if (identity.hasRole("storekeeper")) {
            return Response.ok(storeKeeperFunctions).build();
        }

        return Response.status(425, "Unknown role").build();
    }
}
